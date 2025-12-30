import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import Button from './Button';
import AIChatbot from './AIChatbot';
import { COMPANY_INFO } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar - Desktop only */}
      <div className="hidden md:block bg-slate-850 text-gray-300 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={14} />
              <span>{COMPANY_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin size={14} />
              <span>{COMPANY_INFO.address}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Clock size={14} />
              <span>{COMPANY_INFO.hours}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white"><Facebook size={14} /></a>
            <a href="#" className="hover:text-white"><Instagram size={14} /></a>
            <a href="#" className="hover:text-white"><Twitter size={14} /></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C7.03 2 3 6.03 3 11v9h18v-9c0-4.97-4.03-9-9-9z"/><path d="M9 14s1.5 2 3 2 3-2 3-2"/></svg>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800 tracking-tight block leading-none">SmileCare</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Dental Clinic</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path) ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking">
                <Button size="sm">Book Appointment</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-primary-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 top-20 shadow-lg animate-in slide-in-from-top-5 duration-200">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                  <Button fullWidth>Book Appointment</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-white text-lg font-bold">SmileCare</h3>
              <p className="text-sm leading-relaxed">
                Providing top-tier dental care with a gentle touch. 
                Your smile is our priority, and we are dedicated to your long-term oral health.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-primary-400 transition-colors">Services</Link></li>
                <li><Link to="/doctors" className="hover:text-primary-400 transition-colors">Our Doctors</Link></li>
                <li><Link to="/booking" className="hover:text-primary-400 transition-colors">Book Now</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services" className="hover:text-primary-400 transition-colors">General Dentistry</Link></li>
                <li><Link to="/services" className="hover:text-primary-400 transition-colors">Cosmetic Whitening</Link></li>
                <li><Link to="/services" className="hover:text-primary-400 transition-colors">Invisalign</Link></li>
                <li><Link to="/services" className="hover:text-primary-400 transition-colors">Oral Surgery</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary-500 shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary-500 shrink-0" />
                  <span>{COMPANY_INFO.phone}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={18} className="text-primary-500 shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.hours}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} SmileCare Dental Clinic. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/admin" className="text-slate-700 hover:text-slate-500 transition-colors">Staff Login</Link>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
      <AIChatbot />
    </div>
  );
};

export default Layout;