import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Star, Award, Clock, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { SERVICES, DOCTORS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-primary-50 overflow-hidden">
        <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide">
                <Star size={12} className="fill-current" /> Voted Best Local Clinic 2024
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15]">
                A Better Life Starts With A <span className="text-primary-600">Beautiful Smile</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Experience world-class dental care in a relaxing environment. From routine checkups to complex surgeries, our expert team is here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/booking">
                  <Button size="lg" className="shadow-lg shadow-primary-500/30">Book Appointment</Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg">View Our Services</Button>
                </Link>
              </div>
              <div className="pt-8 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                       <img src={`https://picsum.photos/id/${i+50}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="font-medium text-gray-700">500+ Happy Patients</span>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
                  alt="Dentist treating patient" 
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary-500 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-200 rounded-full -z-10 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Certified Experts', desc: 'Board-certified doctors' },
              { icon: Clock, title: '24/7 Support', desc: 'Emergency care available' },
              { icon: Award, title: 'Modern Tech', desc: 'Latest dental equipment' },
              { icon: Star, title: 'Top Rated', desc: '4.9/5 Average rating' },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="bg-primary-50 text-primary-600 p-3 rounded-lg">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Comprehensive Dental Care</h2>
            <p className="text-gray-600">We offer a full range of dental treatments to keep your smile healthy and bright.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map(service => (
              <div key={service.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
                <div className="w-14 h-14 bg-secondary-50 text-secondary-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary-600 group-hover:text-white transition-colors">
                  {/* We would dynamically render icons here, simplified for demo */}
                  <Shield size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between mt-auto">
                   <span className="text-primary-600 font-semibold text-sm">From ${service.priceStart}</span>
                   <Link to="/services" className="text-gray-400 hover:text-primary-600 transition-colors">
                     <ArrowRight size={20} />
                   </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the Doctors Teaser */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Specialists</h2>
              <p className="text-gray-600 max-w-xl">Our team of experienced dentists and specialists are dedicated to providing you with the best possible care.</p>
            </div>
            <Link to="/doctors">
              <Button variant="secondary">See All Doctors</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DOCTORS.slice(0,3).map(doctor => (
              <div key={doctor.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900">{doctor.name}</h3>
                  <p className="text-primary-600 text-sm font-medium mb-3">{doctor.title}</p>
                  <p className="text-gray-500 text-sm line-clamp-2">{doctor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600 rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Smile?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Book your appointment online today. New patients get a free consultation for cosmetic procedures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/booking">
               <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">Book Appointment Now</Button>
             </Link>
             <Link to="/contact">
               <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 hover:text-white">Contact Us</Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;