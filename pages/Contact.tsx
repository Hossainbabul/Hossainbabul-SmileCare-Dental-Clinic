import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '../components/Button';
import { COMPANY_INFO } from '../constants';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team or visit our clinic.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Our Location</h3>
                  <p className="text-gray-600 mt-1">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Phone Number</h3>
                  <p className="text-gray-600 mt-1">{COMPANY_INFO.phone}</p>
                  <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Email Address</h3>
                  <p className="text-gray-600 mt-1">{COMPANY_INFO.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
                <Clock size={20} className="text-primary-600" /> Clinic Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div>
             <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
               {submitted ? (
                 <div className="text-center py-12">
                   <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Send size={32} />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                   <p className="text-gray-600 mt-2">We will get back to you shortly.</p>
                   <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6">Send Another</Button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                   <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                   <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                       <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                       <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                     <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                     <textarea rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"></textarea>
                   </div>
                   <Button type="submit" fullWidth>Send Message</Button>
                 </form>
               )}
             </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 bg-gray-200 rounded-3xl h-96 w-full flex items-center justify-center text-gray-500 relative overflow-hidden">
           {/* Simulate Map UI */}
           <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=1600x400&sensor=false&key=YOUR_KEY')] bg-cover bg-center opacity-50"></div>
           <div className="relative z-10 bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
             <MapPin className="text-red-500 animate-bounce" />
             <span className="font-semibold text-slate-900">123 Wellness Blvd, Health City</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;