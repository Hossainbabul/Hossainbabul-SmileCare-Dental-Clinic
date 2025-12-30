import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { SERVICES } from '../constants';
import { ServiceCategory } from '../types';

const Services: React.FC = () => {
  // Group services by category
  const categories = Object.values(ServiceCategory);

  return (
    <div className="bg-white">
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Dental Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From routine hygiene to advanced restorative treatments, we use state-of-the-art technology to ensure your comfort and care.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {categories.map((category) => {
          const categoryServices = SERVICES.filter(s => s.category === category);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category} className="scroll-mt-24" id={category.toLowerCase().replace(' ', '-')}>
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-px bg-gray-200 flex-1"></div>
                 <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">{category}</h2>
                 <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {categoryServices.map(service => (
                  <div key={service.id} className="group border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-primary-100 bg-white flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                      <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-2 py-1 rounded">
                        ~{service.durationMin} mins
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {/* Mock benefits - in a real app these would be in the data model */}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Check size={16} className="text-green-500" />
                        <span>Experienced Specialists</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Check size={16} className="text-green-500" />
                        <span>Modern Technology</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                      <div className="text-slate-900 font-bold">
                        Start from <span className="text-2xl">${service.priceStart}</span>
                      </div>
                      <Link to={`/booking?serviceId=${service.id}`}>
                        <Button size="sm" className="group-hover:translate-x-1 transition-transform">
                          Book Now <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* CTA Strip */}
      <div className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2">Unsure what you need?</h3>
            <p className="text-primary-100">Use our AI assistant or call us for a free consultation.</p>
          </div>
          <div className="flex gap-4">
             <Link to="/contact">
               <Button variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">Contact Us</Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;