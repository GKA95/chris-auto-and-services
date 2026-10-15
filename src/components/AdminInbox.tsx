import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import {
  Shield,
  Lock,
  LogOut,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Trash2,
  RefreshCw,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Database,
  Info,
} from 'lucide-react';
import { EnquiryData } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface AdminInboxProps {
  onBackToSite: () => void;
}

export const AdminInbox: React.FC<AdminInboxProps> = ({ onBackToSite }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [enquiries, setEnquiries] = useState<EnquiryData[]>([]);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filters & search
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryData | null>(null);
  const [ownerNoteInput, setOwnerNoteInput] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Config status from server
  const [systemConfig, setSystemConfig] = useState<{
    databaseConfigured?: boolean;
    whatsappNumber?: string;
    whatsappEnabled?: boolean;
    ownerEmail?: string;
    emailServiceConfigured?: boolean;
  }>({});

  const AUTHORIZED_OWNER_EMAIL = 'gideonkwesiansah@gmail.com';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    // Fetch system status
    fetch('/api/config/status')
      .then((res) => res.json())
      .then((data) => setSystemConfig(data))
      .catch((err) => console.warn('Could not load server status:', err));

    return () => unsubscribe();
  }, []);

  const isAuthorized =
    currentUser && currentUser.email?.toLowerCase() === AUTHORIZED_OWNER_EMAIL.toLowerCase();

  // Load enquiries from real server endpoint
  const loadEnquiries = async () => {
    setIsLoadingEnquiries(true);
    setFetchError(null);

    try {
      const headers: Record<string, string> = {};
      if (currentUser?.email) {
        headers['x-admin-email'] = currentUser.email;
      }
      // If user has token, send Bearer token
      if (currentUser) {
        const token = await currentUser.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/admin/enquiries', { headers });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch enquiries.');
      }

      setEnquiries(data.enquiries || []);
      if (data.enquiries && data.enquiries.length > 0 && !selectedEnquiry) {
        setSelectedEnquiry(data.enquiries[0]);
        setOwnerNoteInput(data.enquiries[0].notes || '');
      }
    } catch (err) {
      console.error('Error loading enquiries:', err);
      setFetchError(err instanceof Error ? err.message : 'Error retrieving inbox messages.');
    } finally {
      setIsLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      loadEnquiries();
    }
  }, [isAuthorized]);

  const handleGoogleSignIn = async () => {
    setFetchError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Sign-in error:', err);
      setFetchError(err instanceof Error ? err.message : 'Sign-in failed.');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setEnquiries([]);
    setSelectedEnquiry(null);
  };

  const handleStatusChange = async (enquiryId: string, newStatus: 'new' | 'contacted' | 'closed') => {
    setIsUpdatingStatus(true);
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (currentUser?.email) headers['x-admin-email'] = currentUser.email;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Failed to update status.');
      }

      // Update local state
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
      setFeedbackToast({ type: 'success', message: `Status updated to ${newStatus}` });
      setTimeout(() => setFeedbackToast(null), 3500);
    } catch (err) {
      setFeedbackToast({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to update status.',
      });
      setTimeout(() => setFeedbackToast(null), 4000);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry?.id) return;
    setIsUpdatingStatus(true);
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (currentUser?.email) headers['x-admin-email'] = currentUser.email;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ notes: ownerNoteInput }),
      });

      if (!res.ok) throw new Error('Failed to save notes.');

      setEnquiries((prev) =>
        prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, notes: ownerNoteInput } : e))
      );
      setSelectedEnquiry({ ...selectedEnquiry, notes: ownerNoteInput });
      setFeedbackToast({ type: 'success', message: 'Internal note saved successfully.' });
      setTimeout(() => setFeedbackToast(null), 3500);
    } catch (err) {
      setFeedbackToast({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to save note.',
      });
      setTimeout(() => setFeedbackToast(null), 4000);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const executeDelete = async (enquiryId: string) => {
    setDeleteConfirmId(null);
    try {
      const headers: Record<string, string> = {};
      if (currentUser?.email) headers['x-admin-email'] = currentUser.email;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: 'DELETE',
        headers,
      });

      if (!res.ok) throw new Error('Failed to delete enquiry.');

      setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
      if (selectedEnquiry?.id === enquiryId) {
        setSelectedEnquiry(null);
      }
      setFeedbackToast({ type: 'success', message: 'Enquiry record deleted.' });
      setTimeout(() => setFeedbackToast(null), 3500);
    } catch (err) {
      setFeedbackToast({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to delete record.',
      });
      setTimeout(() => setFeedbackToast(null), 4000);
    }
  };

  // Filtered list
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.fullName.toLowerCase().includes(q) ||
      item.phoneNumber.toLowerCase().includes(q) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      item.service.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-4 sm:px-6 py-4 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            &larr; Back to Public Website
          </button>
          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            <h1 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white">
              Chris Auto &amp; Tour Services — Owner Inbox
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="pill" />

          {currentUser && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs text-zinc-600 dark:text-zinc-400">
                Signed in as: <strong className="text-zinc-900 dark:text-white">{currentUser.email}</strong>
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Loading State */}
        {authLoading ? (
          <div className="py-20 text-center text-zinc-500 dark:text-zinc-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-red-500 mb-3" />
            <span>Checking authentication credentials...</span>
          </div>
        ) : !currentUser ? (
          /* Sign-in prompt */
          <div className="max-w-md mx-auto my-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-center space-y-6 shadow-xl dark:shadow-2xl transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/80 flex items-center justify-center mx-auto text-red-600 dark:text-red-500">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">Owner Portal Sign In</h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                This inbox is restricted strictly to the business owner account.
              </p>
              <div className="text-xs bg-zinc-100 dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 font-mono">
                Authorized Owner: {AUTHORIZED_OWNER_EMAIL}
              </div>
            </div>

            {fetchError && (
              <div className="p-3 bg-red-100 dark:bg-red-950/70 border border-red-300 dark:border-red-800 rounded-xl text-xs text-red-800 dark:text-red-300">
                {fetchError}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-950/20 dark:shadow-red-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              Sign in with Google Account
            </button>

            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
              Public customers submit enquiries directly on the website without needing an account.
            </p>
          </div>
        ) : !isAuthorized ? (
          /* Unauthorized user logged in */
          <div className="max-w-lg mx-auto my-16 bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900/80 rounded-3xl p-8 text-center space-y-5 shadow-xl dark:shadow-2xl transition-colors">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">Access Restricted</h2>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                You are currently signed in as <strong className="text-zinc-950 dark:text-white">{currentUser.email}</strong>.
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                This account is not authorized to view customer messages. Access is restricted exclusively to the business owner ({AUTHORIZED_OWNER_EMAIL}).
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-2.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Sign out and try owner account
            </button>
          </div>
        ) : (
          /* Authorized Owner Dashboard */
          <div className="space-y-6">
            
            {/* Action Feedback Toast */}
            {feedbackToast && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all animate-in fade-in slide-in-from-top-2 ${
                  feedbackToast.type === 'success'
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                    : 'bg-red-100 dark:bg-red-950/80 border-red-300 dark:border-red-700 text-red-900 dark:text-red-200'
                }`}
              >
                <span>{feedbackToast.message}</span>
                <button
                  onClick={() => setFeedbackToast(null)}
                  className="ml-3 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  &times;
                </button>
              </div>
            )}

            {/* Top Stat & Controls Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center justify-between shadow-sm transition-colors">
                <div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-bold">Total Enquiries</div>
                  <div className="text-2xl font-black text-zinc-950 dark:text-white mt-1">{enquiries.length}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                  <Mail className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center justify-between shadow-sm transition-colors">
                <div>
                  <div className="text-xs text-red-600 dark:text-red-400 uppercase font-bold">New Unread</div>
                  <div className="text-2xl font-black text-red-600 dark:text-red-500 mt-1">
                    {enquiries.filter((e) => e.status === 'new').length}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800/80 flex items-center justify-center text-red-600 dark:text-red-400">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center justify-between shadow-sm transition-colors">
                <div>
                  <div className="text-xs text-amber-600 dark:text-yellow-400 uppercase font-bold">Contacted</div>
                  <div className="text-2xl font-black text-amber-600 dark:text-yellow-500 mt-1">
                    {enquiries.filter((e) => e.status === 'contacted').length}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-yellow-950/80 border border-amber-200 dark:border-yellow-800/80 flex items-center justify-center text-amber-600 dark:text-yellow-400">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex items-center justify-between shadow-sm transition-colors">
                <div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 uppercase font-bold">Closed</div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-500 mt-1">
                    {enquiries.filter((e) => e.status === 'closed').length}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm transition-colors">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {(['all', 'new', 'contacted', 'closed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      statusFilter === st
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search name, phone, trip..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-500"
                  />
                </div>

                <button
                  onClick={loadEnquiries}
                  disabled={isLoadingEnquiries}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-colors cursor-pointer"
                  title="Refresh enquiries"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingEnquiries ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Split Screen: Enquiry List & Detail View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Enquiries List */}
              <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-1">
                {filteredEnquiries.length === 0 ? (
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center text-zinc-500 dark:text-zinc-400 shadow-sm">
                    <Mail className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
                    <p className="text-sm">No enquiries found matching filter.</p>
                  </div>
                ) : (
                  filteredEnquiries.map((item) => {
                    const isSelected = selectedEnquiry?.id === item.id;
                    const statusColor =
                      item.status === 'new'
                        ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800'
                        : item.status === 'contacted'
                        ? 'bg-amber-100 dark:bg-yellow-950 text-amber-700 dark:text-yellow-400 border-amber-300 dark:border-yellow-800'
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800';

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedEnquiry(item);
                          setOwnerNoteInput(item.notes || '');
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-zinc-100 dark:bg-zinc-800 border-red-500 shadow-md'
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-zinc-950 dark:text-white truncate max-w-[180px]">
                            {item.fullName}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${statusColor}`}>
                            {item.status}
                          </span>
                        </div>

                        <div className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-2 mb-2">
                          <Phone className="w-3 h-3 text-red-500" />
                          <span>{item.phoneNumber}</span>
                        </div>

                        <div className="text-xs text-zinc-800 dark:text-zinc-300 font-medium line-clamp-1 mb-2">
                          {item.service}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                          <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}</span>
                          {item.location && <span className="truncate max-w-[140px]">{item.location}</span>}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Enquiry Detail Panel */}
              <div className="lg:col-span-7">
                {selectedEnquiry ? (
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl transition-colors">
                    
                    {/* Header with Status Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider">
                          Customer Enquiry Record
                        </div>
                        <h2 className="text-2xl font-extrabold text-zinc-950 dark:text-white mt-1">
                          {selectedEnquiry.fullName}
                        </h2>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Mark Status:</span>
                        {(['new', 'contacted', 'closed'] as const).map((st) => (
                          <button
                            key={st}
                            disabled={isUpdatingStatus}
                            onClick={() => handleStatusChange(selectedEnquiry.id!, st)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                              selectedEnquiry.status === st
                                ? 'bg-red-600 text-white shadow-sm'
                                : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Call & Email actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <a
                        href={`tel:${selectedEnquiry.phoneNumber}`}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call Customer
                      </a>

                      {selectedEnquiry.email ? (
                        <a
                          href={`mailto:${selectedEnquiry.email}?subject=Chris%20Auto%20Rental%20Enquiry%20Confirmation`}
                          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white text-xs font-bold border border-zinc-300 dark:border-zinc-700 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email Customer
                        </a>
                      ) : (
                        <div className="py-2.5 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-950 text-zinc-500 text-xs text-center border border-zinc-200 dark:border-zinc-800">
                          No email provided
                        </div>
                      )}

                      <a
                        href={`https://wa.me/${selectedEnquiry.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${selectedEnquiry.fullName}, this is Chris Auto & Tour Services regarding your car rental enquiry.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-emerald-600 dark:bg-emerald-950 hover:bg-emerald-700 dark:hover:bg-emerald-900 border border-emerald-500 dark:border-emerald-800 text-white dark:text-emerald-300 text-xs font-bold transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                    </div>

                    {/* Enquiry Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs transition-colors">
                      <div>
                        <span className="text-zinc-500 dark:text-zinc-400 block font-semibold">Service Needed:</span>
                        <span className="text-zinc-950 dark:text-white font-bold text-sm">{selectedEnquiry.service}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 dark:text-zinc-400 block font-semibold">Submitted On:</span>
                        <span className="text-zinc-700 dark:text-zinc-200">
                          {selectedEnquiry.createdAt ? new Date(selectedEnquiry.createdAt).toLocaleString() : 'Recent'}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500 dark:text-zinc-400 block font-semibold">Preferred Pickup:</span>
                        <span className="text-zinc-700 dark:text-zinc-200">{selectedEnquiry.preferredPickupDateTime || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 dark:text-zinc-400 block font-semibold">Preferred Return:</span>
                        <span className="text-zinc-700 dark:text-zinc-200">{selectedEnquiry.preferredReturnDateTime || 'Not specified'}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-zinc-500 dark:text-zinc-400 block font-semibold">Pickup/Delivery Location:</span>
                        <span className="text-zinc-700 dark:text-zinc-200">{selectedEnquiry.location || 'Mankessim / Not specified'}</span>
                      </div>
                    </div>

                    {/* Customer Message */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Customer Message:
                      </div>
                      <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap transition-colors">
                        {selectedEnquiry.message}
                      </div>
                    </div>

                    {/* Owner Internal Notes */}
                    <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                          Internal Owner Notes
                        </span>
                        <button
                          onClick={handleSaveNotes}
                          disabled={isUpdatingStatus}
                          className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          Save Note
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Add private booking notes (e.g., agreed rate, car allocated, pickup time)..."
                        value={ownerNoteInput}
                        onChange={(e) => setOwnerNoteInput(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-500"
                      />
                    </div>

                    {/* Danger Zone: Delete */}
                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                      {deleteConfirmId === selectedEnquiry.id ? (
                        <div className="flex items-center gap-2 bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-700/80 p-2 rounded-xl text-xs">
                          <span className="text-red-800 dark:text-red-200">Confirm permanent deletion?</span>
                          <button
                            onClick={() => executeDelete(selectedEnquiry.id!)}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg cursor-pointer"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2.5 py-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 rounded-lg cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(selectedEnquiry.id!)}
                          className="inline-flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Enquiry Record
                        </button>
                      )}
                    </div>

                  </div>
                ) : (
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center text-zinc-500 dark:text-zinc-400 shadow-sm transition-colors">
                    <Info className="w-8 h-8 mx-auto text-zinc-400 mb-3" />
                    <p className="text-sm">Select an enquiry from the list to review details and take action.</p>
                  </div>
                )}
              </div>

            </div>

            {/* System Status & Setup Card */}
            <div className="mt-8 bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-xs space-y-3 shadow-sm transition-colors">
              <div className="flex items-center gap-2 font-bold text-zinc-800 dark:text-zinc-200">
                <Database className="w-4 h-4 text-red-500" />
                <span>System &amp; Service Configuration Status</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-zinc-600 dark:text-zinc-400">
                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="font-semibold text-zinc-800 dark:text-zinc-300">Database Engine</div>
                  <div className="text-emerald-600 dark:text-emerald-400 mt-0.5">&bull; Connected &amp; Persistent (Firestore &amp; Server JSON)</div>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="font-semibold text-zinc-800 dark:text-zinc-300">WhatsApp Integration</div>
                  <div className="text-zinc-800 dark:text-zinc-300 mt-0.5">&bull; Ready on +233 24 708 8974</div>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="font-semibold text-zinc-800 dark:text-zinc-300">Email Alerts</div>
                  <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {systemConfig.emailServiceConfigured ? '&bull; SMTP Configured' : '&bull; Inbox primary (SMTP optional)'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
