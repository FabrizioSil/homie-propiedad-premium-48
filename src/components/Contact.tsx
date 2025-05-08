
import React from 'react';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section id="contacto" className="py-20 md:py-24 bg-white anchor-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-dark-gray">Obtén tu proyección de ingresos Gratuita</h2>
          <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
            Descubre cuánto podría generar tu propiedad con nuestra administración profesional.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;

