
import React, { useState } from 'react';
import ContactModal from './ContactModal';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center py-24 bg-radial-gradient overflow-hidden">
      {/* BG Video would be here in a production environment - using image placeholder for now */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-gray/55 to-dark-gray/55"></div>
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" 
          alt="Apartamento Premium Estilo Industrial" 
          className="w-full h-full object-cover"
          loading="eager" // Change to eager loading for hero image
        />
      </div>

      {/* Key glow effect - enhanced */}
      <div className="absolute right-1/3 top-1/2 w-[300px] h-[300px] bg-key-green rounded-full blur-[50px] opacity-25"></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Convierte tu propiedad en ingresos premium
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4">
            Homie se encarga de todo; tú recibes tu reporte mensual.
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Especialistas en distritos de Lima Top, Perú.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary text-lg"
          >
            Obtén tu proyección de ingresos Gratuita
          </button>
        </div>
      </div>

      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </section>
  );
};

export default Hero;
