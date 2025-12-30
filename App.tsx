import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Dashboard from './pages/admin/Dashboard';

// Component to handle scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;