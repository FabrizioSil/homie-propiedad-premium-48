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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to the webhook
      const response = await fetch('https://hook.us1.make.com/8elap4k96vp4krwzng265tpgevgfkkch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'no-cors', // Added to handle CORS restrictions with external webhooks
      });
      
      console.log('Form data submitted:', formData);
      
      // Show success message
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 md:py-24 bg-white anchor-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-dark-gray">Obtén tu proyección gratuita</h2>
          <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
            Descubre cuánto podría generar tu propiedad con nuestra administración profesional.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <form id="form" onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 md:p-8 border border-key-green/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.nombre}
                />
              </div>
              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  placeholder="+51 999 999 999"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.telefono}
                />
              </div>
              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tucorreo@ejemplo.com"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="direccion">Dirección de la propiedad</label>
                <input
                  id="direccion"
                  type="text"
                  name="direccion"
                  placeholder="Av. Ejemplo 123, Distrito"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.direccion}
                />
              </div>
              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="habitaciones">Número de habitaciones</label>
                <select
                  id="habitaciones"
                  name="habitaciones"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.habitaciones}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1">1 Habitación</option>
                  <option value="2">2 Habitaciones</option>
                  <option value="3">3 Habitaciones</option>
                  <option value="4+">4+ Habitaciones</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="mensaje">Mensaje (opcional)</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="Cuéntanos más sobre tu propiedad"
                  rows={4}
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.mensaje}
                ></textarea>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                id="form-submit" 
                type="submit" 
                className="btn-primary animate-glow-pulse"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Quiero mi proyección gratis'}
              </button>
              <p className="text-sm text-[#9E9E9E] mt-2">
                Al enviar este formulario, aceptas recibir comunicaciones de Homie.
              </p>
              <p className="text-sm text-[#9E9E9E] mt-2">
                📲 Te responderemos por WhatsApp en menos de 12 h.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
