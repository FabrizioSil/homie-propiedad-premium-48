
import React, { useState } from 'react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    habitaciones: '',
    mensaje: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a production app, this would be a real submission to a backend
      console.log('Form data submitted:', formData);
      
      // Simulate successful submission
      toast({
        title: "Formulario enviado con éxito",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      
      // Redirect to thanks page after a short delay
      setTimeout(() => {
        window.location.href = '/gracias';
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error al enviar el formulario",
        description: "Por favor intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contacto" className="py-20 md:py-24 bg-dark-gray anchor-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Obtén tu proyección gratuita</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre cuánto podría generar tu propiedad con nuestra administración profesional.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-medium-gray bg-opacity-10 rounded-xl p-6 md:p-8 shadow-lg border border-key-green/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm" htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  required
                  className="input-field"
                  onChange={handleChange}
                  value={formData.nombre}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm" htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  placeholder="+51 999 999 999"
                  required
                  className="input-field"
                  onChange={handleChange}
                  value={formData.telefono}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tucorreo@ejemplo.com"
                  required
                  className="input-field"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm" htmlFor="direccion">Dirección de la propiedad</label>
                <input
                  id="direccion"
                  type="text"
                  name="direccion"
                  placeholder="Av. Ejemplo 123, Distrito"
                  required
                  className="input-field"
                  onChange={handleChange}
                  value={formData.direccion}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm" htmlFor="habitaciones">Número de habitaciones</label>
                <select
                  id="habitaciones"
                  name="habitaciones"
                  required
                  className="input-field"
                  onChange={handleChange}
                  value={formData.habitaciones}
                >
                  <option value="" disabled selected>Selecciona una opción</option>
                  <option value="1">1 Habitación</option>
                  <option value="2">2 Habitaciones</option>
                  <option value="3">3 Habitaciones</option>
                  <option value="4+">4+ Habitaciones</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2 text-sm" htmlFor="mensaje">Mensaje (opcional)</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Cuéntanos más sobre tu propiedad"
                  rows={4}
                  className="input-field"
                  onChange={handleChange}
                  value={formData.mensaje}
                ></textarea>
              </div>
            </div>
            
            <div className="text-center">
              <button type="submit" className="btn-primary animate-glow-pulse">
                Solicitar proyección
              </button>
              <p className="text-sm text-gray-400 mt-4">
                Al enviar este formulario, aceptas recibir comunicaciones de Homie.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
