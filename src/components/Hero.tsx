
import React, { useState } from 'react';
import ContactModal from './ContactModal';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center py-24 bg-radial-gradient overflow-hidden">
      {/* BG Video would be here in a production environment - using image placeholder for now */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-gray/90 to-dark-gray/70"></div>
        <img 
          src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
          alt="Apartamento Premium" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Key glow effect */}
      <div className="absolute right-1/3 top-1/2 w-64 h-64 bg-key-green rounded-full blur-[100px] opacity-20"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Convierte tu propiedad en ingresos premium
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Homie se encarga de todo; tú recibes tu reporte mensual.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary text-lg"
          >
            Obtén tu proyección gratis
          </button>
        </div>
      </div>

      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default Hero;
