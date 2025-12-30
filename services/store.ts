import { create } from 'zustand';
import { Appointment, AppointmentStatus, Doctor, Service, ServiceCategory } from '../types';
import { DOCTORS, SERVICES } from '../constants';

interface AppState {
  services: Service[];
  doctors: Doctor[];
  appointments: Appointment[];
  isAuthenticated: boolean; // For admin simulation
  
  // Actions
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  getDoctorById: (id: string) => Doctor | undefined;
  getServiceById: (id: string) => Service | undefined;
}

// Generate some mock appointments for the admin dashboard
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_1',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    patientPhone: '555-0101',
    serviceId: 's1',
    doctorId: 'd1',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    status: AppointmentStatus.CONFIRMED,
    createdAt: Date.now() - 100000
  },
  {
    id: 'apt_2',
    patientName: 'Alice Smith',
    patientEmail: 'alice@example.com',
    patientPhone: '555-0202',
    serviceId: 's3',
    doctorId: 'd2',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: '14:30',
    status: AppointmentStatus.PENDING,
    createdAt: Date.now() - 50000
  }
];

export const useStore = create<AppState>((set, get) => ({
  services: SERVICES,
  doctors: DOCTORS,
  appointments: MOCK_APPOINTMENTS,
  isAuthenticated: false,

  addAppointment: (data) => {
    const newAppointment: Appointment = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      status: AppointmentStatus.PENDING,
      createdAt: Date.now()
    };
    set((state) => ({ appointments: [newAppointment, ...state.appointments] }));
  },

  updateAppointmentStatus: (id, status) => {
    set((state) => ({
      appointments: state.appointments.map(apt => 
        apt.id === id ? { ...apt, status } : apt
      )
    }));
  },

  loginAdmin: () => set({ isAuthenticated: true }),
  logoutAdmin: () => set({ isAuthenticated: false }),

  getDoctorById: (id) => get().doctors.find(d => d.id === id),
  getServiceById: (id) => get().services.find(s => s.id === id),
}));