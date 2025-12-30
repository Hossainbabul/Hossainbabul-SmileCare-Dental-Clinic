import { Service, Doctor, ServiceCategory } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Routine Checkup & Cleaning',
    category: ServiceCategory.GENERAL,
    description: 'Comprehensive oral examination, digital X-rays (if needed), and professional teeth cleaning to remove plaque and tartar.',
    priceStart: 99,
    durationMin: 45,
    iconName: 'Stethoscope'
  },
  {
    id: 's2',
    title: 'Teeth Whitening',
    category: ServiceCategory.COSMETIC,
    description: 'Professional in-office LED whitening treatment for instant results up to 8 shades lighter.',
    priceStart: 299,
    durationMin: 60,
    iconName: 'Sparkles'
  },
  {
    id: 's3',
    title: 'Invisalign Consultation',
    category: ServiceCategory.ORTHODONTICS,
    description: '3D scanning and consultation for clear aligner therapy to straighten your smile discreetly.',
    priceStart: 0,
    durationMin: 30,
    iconName: 'Smile'
  },
  {
    id: 's4',
    title: 'Root Canal Therapy',
    category: ServiceCategory.SURGERY,
    description: 'Pain-free treatment to save an infected tooth. Performed under local anesthesia.',
    priceStart: 600,
    durationMin: 90,
    iconName: 'Activity'
  },
  {
    id: 's5',
    title: 'Pediatric First Visit',
    category: ServiceCategory.PEDIATRIC,
    description: 'A gentle, fun introduction to dentistry for children under 5. Includes sticker and hygiene kit.',
    priceStart: 79,
    durationMin: 30,
    iconName: 'Baby'
  },
  {
    id: 's6',
    title: 'Dental Implants',
    category: ServiceCategory.SURGERY,
    description: 'Permanent solution for missing teeth. Titanium post placement and crown restoration.',
    priceStart: 1200,
    durationMin: 120,
    iconName: 'Hammer'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Bennett',
    title: 'Chief Dentist, DDS',
    specialties: [ServiceCategory.GENERAL, ServiceCategory.COSMETIC],
    bio: 'Dr. Bennett has over 15 years of experience creating beautiful smiles. She specializes in minimally invasive cosmetic procedures.',
    imageUrl: 'https://picsum.photos/id/64/300/300',
    yearsExperience: 15
  },
  {
    id: 'd2',
    name: 'Dr. James Chen',
    title: 'Orthodontist, DMD',
    specialties: [ServiceCategory.ORTHODONTICS, ServiceCategory.PEDIATRIC],
    bio: 'Dr. Chen is a board-certified orthodontist who loves working with kids and adults to correct alignment issues.',
    imageUrl: 'https://picsum.photos/id/91/300/300',
    yearsExperience: 10
  },
  {
    id: 'd3',
    name: 'Dr. Emily Ross',
    title: 'Oral Surgeon, DMD, MD',
    specialties: [ServiceCategory.SURGERY],
    bio: 'Specializing in implants and complex extractions, Dr. Ross ensures every procedure is as comfortable as possible.',
    imageUrl: 'https://picsum.photos/id/338/300/300',
    yearsExperience: 12
  }
];

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
];

export const COMPANY_INFO = {
  name: 'SmileCare Dental',
  address: '123 Wellness Blvd, Health City, HC 90210',
  phone: '(555) 123-4567',
  email: 'hello@smilecare.demo',
  hours: 'Mon-Fri: 9am - 6pm, Sat: 10am - 4pm'
};