import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Check, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import Button from '../components/Button';
import { useStore } from '../services/store';
import { TIME_SLOTS } from '../constants';

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { services, doctors, addAppointment } = useStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: searchParams.get('serviceId') || '',
    doctorId: searchParams.get('doctorId') || '',
    date: '',
    time: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter doctors based on service
  const filteredDoctors = formData.serviceId 
    ? doctors.filter(d => {
        const service = services.find(s => s.id === formData.serviceId);
        return service && d.specialties.includes(service.category);
      })
    : doctors;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addAppointment({
      serviceId: formData.serviceId,
      doctorId: formData.doctorId,
      date: formData.date,
      time: formData.time,
      patientName: formData.patientName,
      patientEmail: formData.patientEmail,
      patientPhone: formData.patientPhone,
      notes: formData.notes
    });

    setIsSubmitting(false);
    setStep(5); // Success step
  };

  // Helper to get formatted date string for min date attribute
  const getTodayString = () => new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            <span className={step >= 1 ? 'text-primary-600' : ''}>Service</span>
            <span className={step >= 2 ? 'text-primary-600' : ''}>Doctor</span>
            <span className={step >= 3 ? 'text-primary-600' : ''}>Time</span>
            <span className={step >= 4 ? 'text-primary-600' : ''}>Details</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 transition-all duration-300 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select a Service</h2>
              <div className="grid gap-4">
                {services.map(service => (
                  <label key={service.id} className={`flex items-center p-4 border rounded-xl cursor-pointer hover:bg-primary-50 transition-colors ${formData.serviceId === service.id ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' : 'border-gray-200'}`}>
                    <input 
                      type="radio" 
                      name="service" 
                      value={service.id}
                      checked={formData.serviceId === service.id}
                      onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{service.title}</div>
                      <div className="text-sm text-gray-500">{service.durationMin} mins • From ${service.priceStart}</div>
                    </div>
                    {formData.serviceId === service.id && <Check className="text-primary-600" />}
                  </label>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={handleNext} disabled={!formData.serviceId}>Next Step</Button>
              </div>
            </div>
          )}

          {/* Step 2: Doctor Selection */}
          {step === 2 && (
            <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose a Specialist</h2>
              {filteredDoctors.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No specialists available for the selected service category. Please go back and select a different service.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredDoctors.map(doctor => (
                    <label key={doctor.id} className={`relative flex items-center p-4 border rounded-xl cursor-pointer hover:bg-primary-50 transition-colors ${formData.doctorId === doctor.id ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' : 'border-gray-200'}`}>
                      <input 
                        type="radio" 
                        name="doctor" 
                        value={doctor.id}
                        checked={formData.doctorId === doctor.id}
                        onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                        className="sr-only"
                      />
                      <img src={doctor.imageUrl} alt={doctor.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                      <div>
                        <div className="font-semibold text-slate-900">{doctor.name}</div>
                        <div className="text-xs text-gray-500">{doctor.title}</div>
                      </div>
                      {formData.doctorId === doctor.id && <div className="absolute top-4 right-4"><Check className="text-primary-600" size={20} /></div>}
                    </label>
                  ))}
                </div>
              )}
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={handleBack}><ChevronLeft size={18} className="mr-2" /> Back</Button>
                <Button onClick={handleNext} disabled={!formData.doctorId}>Next Step</Button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Time</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input 
                    type="date" 
                    min={getTodayString()}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Slots</label>
                  {formData.date ? (
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({...formData, time})}
                          className={`px-2 py-2 text-sm rounded-lg border transition-colors ${
                            formData.time === time 
                              ? 'bg-primary-600 text-white border-primary-600' 
                              : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic p-4 bg-gray-50 rounded-lg border border-gray-100">
                      Please select a date first
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={handleBack}><ChevronLeft size={18} className="mr-2" /> Back</Button>
                <Button onClick={handleNext} disabled={!formData.date || !formData.time}>Next Step</Button>
              </div>
            </div>
          )}

          {/* Step 4: Patient Details */}
          {step === 4 && (
            <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Patient Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      required
                      value={formData.patientName}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.patientEmail}
                      onChange={(e) => setFormData({...formData, patientEmail: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.patientPhone}
                      onChange={(e) => setFormData({...formData, patientPhone: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea 
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Any specific concerns or questions?"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Booking Summary</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>Service: {services.find(s => s.id === formData.serviceId)?.title}</li>
                    <li>Doctor: {doctors.find(d => d.id === formData.doctorId)?.name}</li>
                    <li>Date: {formData.date} at {formData.time}</li>
                  </ul>
                </div>

                <div className="mt-8 flex justify-between pt-4 border-t border-gray-100">
                  <Button type="button" variant="outline" onClick={handleBack}><ChevronLeft size={18} className="mr-2" /> Back</Button>
                  <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="p-12 text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Thank you, {formData.patientName}. We have sent a confirmation email to {formData.patientEmail}.
                We look forward to seeing you!
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate('/')}>Return Home</Button>
                <Button variant="outline" onClick={() => window.print()}>Print Details</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;