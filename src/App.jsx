import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import PageTransition from './components/PageTransition';




const AppContent = () => {
  return (
    
    <>
    
      <Header />
      
        <main id="main" className="min-h-screen px-4 sm:px-6 lg:px-8">
          <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          </PageTransition>
        </main>
      
      <Footer />
      <BackToTop />
      
    </>
    
  );
};

const App = () => {
  return (
    <LoadingProvider>
      <PageTransition>
      <AppContent />
      </PageTransition>
    </LoadingProvider>
  );
};

export default App;
