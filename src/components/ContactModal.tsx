
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import type { CustomFormData, FormErrors } from '../types/form-types';
import { validateForm, prepareFormDataForSubmission } from '../utils/form-utils';

type ContactModalProps = {
  onClose: () => void;
};

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CustomFormData>({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: '',
    distrito: '',
    habitaciones: '',
    mensaje: '',
    metraje: '',
    banos: '',
    capacidad: '',
    amoblado: false,
    aceptaTerminos: false,
    fotos: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, amoblado: checked }));
  };

  const handleTermsChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, aceptaTerminos: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { errors, isValid } = validateForm(formData);
    setFormErrors(errors);
    
    if (!isValid) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for webhook without image URLs
      const jsonData = prepareFormDataForSubmission(formData, []);
      
      // Send data to the webhook
      const response = await fetch('https://hook.us1.make.com/8elap4k96vp4krwzng265tpgevgfkkch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
        mode: 'no-cors', // Added to handle CORS restrictions with external webhooks
      });
      
      console.log('Form data submitted:', jsonData);
      
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

  // Custom placeholder style with reduced opacity
  const placeholderStyle = "placeholder:text-gray-400/50";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-gray border border-key-green/20 rounded-xl w-full max-w-md md:max-w-lg relative animate-fade-in shadow-xl overflow-y-auto max-h-[90vh]">
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
            {/* Información de contacto */}
            <div>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                required
                className={`input-field ${placeholderStyle}`}
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
                  className={`input-field ${placeholderStyle}`}
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
                  className={`input-field ${placeholderStyle}`}
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="ciudad"
                  placeholder="Ciudad"
                  required
                  className={`input-field ${placeholderStyle}`}
                  onChange={handleChange}
                  value={formData.ciudad}
                />
              </div>
              <div>
                <select
                  name="distrito"
                  required
                  className={`input-field ${placeholderStyle}`}
                  onChange={handleChange}
                  value={formData.distrito}
                >
                  <option value="" disabled>Distrito</option>
                  <option value="San Isidro">San Isidro</option>
                  <option value="Miraflores">Miraflores</option>
                  <option value="Barranco">Barranco</option>
                  <option value="San Miguel">San Miguel</option>
                  <option value="Magdalena del Mar">Magdalena del Mar</option>
                </select>
              </div>
            </div>
            
            <div>
              <input
                type="text"
                name="direccion"
                placeholder="Dirección de la propiedad"
                required
                className={`input-field ${placeholderStyle}`}
                onChange={handleChange}
                value={formData.direccion}
              />
            </div>
            
            {/* Características de la propiedad - Now using the same placeholder opacity for all select inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  name="metraje"
                  required
                  className={`input-field ${placeholderStyle}`}
                  onChange={handleChange}
                  value={formData.metraje}
                >
                  <option value="" disabled>Metraje (m²)</option>
                  <option value="Menos de 50">Menos de 50 m²</option>
                  <option value="50-80">50-80 m²</option>
                  <option value="80-120">80-120 m²</option>
                  <option value="120-150">120-150 m²</option>
                  <option value="Más de 150">Más de 150 m²</option>
                </select>
              </div>
              
              <div>
                <select
                  name="habitaciones"
                  required
                  className={`input-field ${placeholderStyle}`}
                  onChange={handleChange}
                  value={formData.habitaciones}
                >
                  <option value="" disabled>Número de habitaciones</option>
                  <option value="1">1 Habitación</option>
                  <option value="2">2 Habitaciones</option>
                  <option value="3">3 Habitaciones</option>
                  <option value="4+">4+ Habitaciones</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  name="banos"
                  required
                  className={`input-field ${placeholderStyle}`}
                  onChange={handleChange}
                  value={formData.banos}
                >
                  <option value="" disabled>Número de baños</option>
                  <option value="1">1 Baño</option>
                  <option value="2">2 Baños</option>
                  <option value="3+">3+ Baños</option>
                </select>
              </div>
              
              <div>
                <select
                  name="capacidad"
                  required
                  className={`input-field ${placeholderStyle}`}
                  onChange={handleChange}
                  value={formData.capacidad}
                >
                  <option value="" disabled>Capacidad de huéspedes</option>
                  <option value="1-2">1-2 Personas</option>
                  <option value="3-4">3-4 Personas</option>
                  <option value="5-6">5-6 Personas</option>
                  <option value="7+">7+ Personas</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="amoblado" 
                checked={formData.amoblado}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="amoblado" className="text-white">¿La propiedad está amoblada?</Label>
            </div>
            
            <div>
              <textarea
                name="mensaje"
                placeholder="Mensaje (opcional)"
                rows={3}
                className={`input-field ${placeholderStyle}`}
                onChange={handleChange}
                value={formData.mensaje}
              ></textarea>
            </div>
            
            {/* Términos y condiciones - Updated with the requested links */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terminos" 
                checked={formData.aceptaTerminos}
                onCheckedChange={handleTermsChange}
              />
              <Label htmlFor="terminos" className="text-white">
                Acepto los <a href="https://javierfloresmacias.notion.site/Terminos-Condiciones-1f5a1b073dc7808e83bdfd831bab1f10?pvs=4" className="text-key-green hover:underline" target="_blank" rel="noopener noreferrer">términos y condiciones</a> y la <a href="https://javierfloresmacias.notion.site/Politicas-de-privacidad-1f5a1b073dc780e6ab21e47ece95e0d0?pvs=4" className="text-key-green hover:underline" target="_blank" rel="noopener noreferrer">política de privacidad</a>
              </Label>
            </div>
            {formErrors.aceptaTerminos && (
              <p className="text-red-500 text-xs">{formErrors.aceptaTerminos}</p>
            )}
            
            <div>
              <button 
                type="submit" 
                className="btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Quiero mi proyección gratis'}
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
