import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

// Ensure data directory exists for persistent storage
const DATA_DIR = path.resolve(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

export interface EnquiryRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  service: string;
  preferredPickupDateTime?: string;
  preferredReturnDateTime?: string;
  location?: string;
  message: string;
  consent: boolean;
  status: 'new' | 'contacted' | 'closed';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  ip?: string;
}

// In-memory cache + file sync helper
function readEnquiries(): EnquiryRecord[] {
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading enquiries database file:', err);
    return [];
  }
}

function writeEnquiries(records: EnquiryRecord[]): void {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting enquiries database file:', err);
  }
}

// Read firebase applet config if available
let firebaseConfig: Record<string, string> = {};
try {
  const configPath = path.resolve(__dirname, 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
} catch (e) {
  console.warn('Could not load firebase-applet-config.json:', e);
}

// Simple in-memory rate limiter per IP: max 15 requests per 10 minutes
const ipRateLimits = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateLimits.get(ip);
  if (!entry || entry.expiresAt < now) {
    ipRateLimits.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 15) {
    return false;
  }
  entry.count++;
  return true;
}

app.use(express.json({ limit: '200kb' }));

// Health / Status endpoint
app.get('/api/config/status', (_req: Request, res: Response) => {
  res.json({
    businessName: 'Chris Auto & Tour Services',
    location: 'Mankessim, Ghana',
    phoneNumber: '+233 24 708 8974',
    whatsappNumber: '233247088974',
    whatsappEnabled: true,
    ownerEmail: 'gideonkwesiansah@gmail.com',
    firebaseProjectId: firebaseConfig.projectId || 'inspired-text-lvr20',
    firestoreDatabaseId: firebaseConfig.firestoreDatabaseId || '',
    databaseConfigured: Boolean(firebaseConfig.projectId),
    emailServiceConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
  });
});

// Confirmed valid services list
const VALID_SERVICES = [
  'Daily car rentals',
  'Weekly and monthly rentals',
  'Airport pickup and drop-off',
  'Luxury and executive cars',
  'Chauffeur-driven services',
  'General enquiry',
];

// Helper to sanitize text
function sanitize(str: unknown, maxLen = 3000): string {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen);
}

// Public endpoint to submit customer enquiry
app.post('/api/enquiries', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a few minutes or call +233 24 708 8974 directly.',
    });
  }

  // Honeypot spam check
  if (req.body.website_url) {
    // Bot detected; silent fake accept to avoid alerting bot
    return res.json({
      success: true,
      message: 'Your enquiry has been received. The business will contact you to confirm availability and price.',
    });
  }

  const fullName = sanitize(req.body.fullName, 100);
  const phoneNumber = sanitize(req.body.phoneNumber, 30);
  const email = req.body.email ? sanitize(req.body.email, 100) : '';
  const service = sanitize(req.body.service, 100);
  const preferredPickupDateTime = req.body.preferredPickupDateTime ? sanitize(req.body.preferredPickupDateTime, 100) : '';
  const preferredReturnDateTime = req.body.preferredReturnDateTime ? sanitize(req.body.preferredReturnDateTime, 100) : '';
  const location = req.body.location ? sanitize(req.body.location, 200) : '';
  const message = sanitize(req.body.message, 3000);
  const consent = Boolean(req.body.consent);

  // Field Validations
  if (!fullName || fullName.length < 2) {
    return res.status(400).json({ error: 'Please enter your full name (minimum 2 characters).' });
  }

  // Phone number validation: allows Ghanaian formats (e.g. 024..., +233...) and international formats
  const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
  if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 20 || !/^(\+)?[0-9]{7,20}$/.test(cleanPhone)) {
    return res.status(400).json({ error: 'Please enter a valid phone number (e.g. +233 24 708 8974 or 024 708 8974).' });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address or leave the field blank.' });
  }

  if (!service || !VALID_SERVICES.includes(service)) {
    return res.status(400).json({ error: 'Please select a valid service from the list.' });
  }

  if (!message || message.length < 5) {
    return res.status(400).json({ error: 'Please provide a message or describe your rental requirements (minimum 5 characters).' });
  }

  if (!consent) {
    return res.status(400).json({ error: 'Please check the consent box to allow Chris Auto & Tour Services to respond to your enquiry.' });
  }

  // Inconsistent date checking
  if (preferredPickupDateTime && preferredReturnDateTime) {
    const pickupDate = new Date(preferredPickupDateTime);
    const returnDate = new Date(preferredReturnDateTime);
    if (!isNaN(pickupDate.getTime()) && !isNaN(returnDate.getTime())) {
      if (returnDate.getTime() < pickupDate.getTime()) {
        return res.status(400).json({ error: 'Preferred return date cannot be earlier than preferred pickup date.' });
      }
    }
  }

  const nowIso = new Date().toISOString();
  const enquiryId = 'enq_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);

  const newRecord: EnquiryRecord = {
    id: enquiryId,
    fullName,
    phoneNumber,
    email: email || undefined,
    service,
    preferredPickupDateTime: preferredPickupDateTime || undefined,
    preferredReturnDateTime: preferredReturnDateTime || undefined,
    location: location || undefined,
    message,
    consent,
    status: 'new',
    createdAt: nowIso,
    ip: clientIp.substring(0, 45),
  };

  try {
    const list = readEnquiries();
    list.unshift(newRecord);
    writeEnquiries(list);

    // Also attempt server-side Firestore sync if configured
    if (firebaseConfig.projectId && firebaseConfig.apiKey && firebaseConfig.firestoreDatabaseId) {
      try {
        const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.firestoreDatabaseId}/documents/enquiries/${enquiryId}?key=${firebaseConfig.apiKey}`;
        const firestoreDoc = {
          fields: {
            fullName: { stringValue: fullName },
            phoneNumber: { stringValue: phoneNumber },
            service: { stringValue: service },
            message: { stringValue: message },
            consent: { booleanValue: consent },
            status: { stringValue: 'new' },
            createdAt: { stringValue: nowIso },
            ...(email ? { email: { stringValue: email } } : {}),
            ...(preferredPickupDateTime ? { preferredPickupDateTime: { stringValue: preferredPickupDateTime } } : {}),
            ...(preferredReturnDateTime ? { preferredReturnDateTime: { stringValue: preferredReturnDateTime } } : {}),
            ...(location ? { location: { stringValue: location } } : {}),
          },
        };
        fetch(firestoreUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(firestoreDoc),
        }).catch((err) => {
          console.warn('Optional Firestore REST background sync notice:', err?.message || err);
        });
      } catch (fErr) {
        console.warn('Firestore background write error:', fErr);
      }
    }

    return res.status(201).json({
      success: true,
      enquiryId,
      message: 'Your enquiry has been received. The business will contact you to confirm availability and price.',
    });
  } catch (error) {
    console.error('Failed to save enquiry:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred while saving your enquiry. Please call us directly at +233 24 708 8974.',
    });
  }
});

// Admin Authorization Middleware
function verifyAdminAuth(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  const adminEmail = req.headers['x-admin-email'] as string;

  // Check if token or header matches authorized owner email
  const authorizedOwner = 'gideonkwesiansah@gmail.com';
  
  if (adminEmail && adminEmail.toLowerCase() === authorizedOwner.toLowerCase()) {
    return next();
  }

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    // Decode JWT payload without verification for development or verify claim
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
        if (payload.email && payload.email.toLowerCase() === authorizedOwner.toLowerCase()) {
          return next();
        }
      }
    } catch {
      // invalid token format
    }
  }

  // Allow localhost developer pass if in dev mode with specific header
  if (!IS_PROD && req.headers['x-dev-admin'] === 'true') {
    return next();
  }

  return res.status(403).json({
    error: 'Access denied. You must be signed in with the authorized owner account (gideonkwesiansah@gmail.com).',
  });
}

// Protected Admin: Get all enquiries
app.get('/api/admin/enquiries', verifyAdminAuth, (_req: Request, res: Response) => {
  const records = readEnquiries();
  res.json({ enquiries: records });
});

// Protected Admin: Update enquiry status or notes
app.patch('/api/admin/enquiries/:id', verifyAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const validStatuses = ['new', 'contacted', 'closed'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be new, contacted, or closed.' });
  }

  const list = readEnquiries();
  const index = list.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Enquiry not found.' });
  }

  if (status) {
    list[index].status = status;
  }
  if (typeof notes === 'string') {
    list[index].notes = sanitize(notes, 1000);
  }
  list[index].updatedAt = new Date().toISOString();

  writeEnquiries(list);

  res.json({ success: true, enquiry: list[index] });
});

// Protected Admin: Delete enquiry
app.delete('/api/admin/enquiries/:id', verifyAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const list = readEnquiries();
  const filtered = list.filter((item) => item.id !== id);

  if (filtered.length === list.length) {
    return res.status(404).json({ error: 'Enquiry not found.' });
  }

  writeEnquiries(filtered);
  res.json({ success: true });
});

// Vite or Static file serving
async function setupServer() {
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Explicit fallback for client SPA routes in dev
    app.use('*', async (req: Request, res: Response, next) => {
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        const url = req.originalUrl;
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Chris Auto & Tour Services server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
