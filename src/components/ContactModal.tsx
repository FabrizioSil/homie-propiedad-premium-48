
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

type ContactModalProps = {
  onClose: () => void;
};

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-gray border border-key-green/20 rounded-xl w-full max-w-md md:max-w-lg relative animate-fade-in shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-key-green"
        >
          <X size={24} />
        </button>
        
        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Obtén tu proyección gratuita
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                required
                className="input-field"
                onChange={handleChange}
                value={formData.nombre}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  required
                  className="input-field"
                  onChange={handleChange}
                  value={formData.telefono}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="input-field"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            
            <div>
              <input
                type="text"
                name="direccion"
                placeholder="Dirección de la propiedad"
                required
                className="input-field"
                onChange={handleChange}
                value={formData.direccion}
              />
            </div>
            
            <div>
              <select
                name="habitaciones"
                required
                className="input-field"
                onChange={handleChange}
                value={formData.habitaciones}
              >
                <option value="" disabled selected>Número de habitaciones</option>
                <option value="1">1 Habitación</option>
                <option value="2">2 Habitaciones</option>
                <option value="3">3 Habitaciones</option>
                <option value="4+">4+ Habitaciones</option>
              </select>
            </div>
            
            <div>
              <textarea
                name="mensaje"
                placeholder="Mensaje (opcional)"
                rows={3}
                className="input-field"
                onChange={handleChange}
                value={formData.mensaje}
              ></textarea>
            </div>
            
            <div>
              <button type="submit" className="btn-primary w-full">
                Enviar
              </button>
            </div>
            
            <p className="text-xs text-gray-400 text-center mt-4">
              Al enviar este formulario, aceptas recibir comunicaciones de Homie.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
