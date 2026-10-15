export interface EnquiryData {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  service: string;
  preferredPickupDateTime?: string;
  preferredReturnDateTime?: string;
  location?: string;
  message: string;
  consent: boolean;
  status?: 'new' | 'contacted' | 'closed';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ConfirmedService =
  | 'Daily car rentals'
  | 'Weekly and monthly rentals'
  | 'Airport pickup and drop-off'
  | 'Luxury and executive cars'
  | 'Chauffeur-driven services';

export interface VehicleCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  sampleModels: string;
  imageUrl: string;
  serviceCategory: ConfirmedService;
}
