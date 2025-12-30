import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Button from '../components/Button';
import { DOCTORS } from '../constants';

const Doctors: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Medical Team</h1>
          <p className="text-gray-600 max-w-2xl">
            Our dentists are board-certified professionals dedicated to continuous learning and patient comfort.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12">
          {DOCTORS.map((doctor, index) => (
            <div key={doctor.id} className={`flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex-grow space-y-4 text-center md:text-left">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{doctor.name}</h2>
                  <p className="text-primary-600 font-semibold text-lg">{doctor.title}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {doctor.specialties.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    {doctor.yearsExperience}+ Years Exp.
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {doctor.bio}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to={`/booking?doctorId=${doctor.id}`}>
                    <Button className="w-full sm:w-auto">
                      <Calendar size={18} className="mr-2" /> Book Appointment
                    </Button>
                  </Link>
                  <Link to={`/doctors/${doctor.id}`}>
                    <Button variant="outline" className="w-full sm:w-auto">View Full Profile</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;