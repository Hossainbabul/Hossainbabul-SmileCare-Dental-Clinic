export enum ServiceCategory {
  GENERAL = 'General Dentistry',
  COSMETIC = 'Cosmetic Dentistry',
  ORTHODONTICS = 'Orthodontics',
  PEDIATRIC = 'Pediatric Dentistry',
  SURGERY = 'Oral Surgery'
}

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  priceStart: number;
  durationMin: number;
  iconName: string; // Mapping to Lucide icon name
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialties: ServiceCategory[];
  bio: string;
  imageUrl: string;
  yearsExperience: number;
}

export interface TimeSlot {
  id: string;
  time: string; // "09:00"
  available: boolean;
}

export enum AppointmentStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  doctorId: string;
  date: string; // ISO date string YYYY-MM-DD
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isError?: boolean;
}