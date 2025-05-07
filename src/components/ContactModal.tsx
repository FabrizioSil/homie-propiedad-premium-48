
import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type ContactModalProps = {
  onClose: () => void;
};

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
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
    fotos: [] as File[],
    aceptaTerminos: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        fotos: [...prev.fotos, ...filesArray]
      }));
      
      // Create preview URLs for displaying selected files
      const fileNames = filesArray.map(file => file.name);
      setSelectedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.aceptaTerminos) {
      errors.aceptaTerminos = "Debes aceptar los términos y condiciones";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a FormData object to handle files
      const formDataToSend = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'fotos') {
          formDataToSend.append(key, String(formData[key as keyof typeof formData]));
        }
      });
      
      // Append each file
      formData.fotos.forEach((file, index) => {
        formDataToSend.append(`foto_${index}`, file);
      });

      // Convert FormData to JSON-compatible object for webhook
      // Note: Files cannot be directly JSONified, so we'll just send metadata
      const jsonData = {
        ...formData,
        fotos: formData.fotos.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        })),
        amoblado: formData.amoblado ? 'Sí' : 'No',
        aceptaTerminos: formData.aceptaTerminos ? 'Sí' : 'No'
      };
      
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="ciudad"
                  placeholder="Ciudad"
                  required
                  className="input-field"
                  onChange={handleChange}
                  value={formData.ciudad}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="distrito"
                  placeholder="Distrito"
                  required
                  className="input-field"
                  onChange={handleChange}
                  value={formData.distrito}
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
            
            {/* Características de la propiedad */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <select
                  name="metraje"
                  required
                  className="input-field"
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
                  className="input-field"
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
                  className="input-field"
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
                  className="input-field"
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
            
            {/* Sección de fotos */}
            <div className="space-y-2">
              <Label htmlFor="fotos" className="text-white block mb-1">Fotos de la propiedad</Label>
              <div 
                onClick={() => fileInputRef.current?.click()} 
                className="border-2 border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer hover:border-key-green transition-colors"
              >
                <p className="text-gray-300">Haz clic para agregar fotos</p>
                <input
                  ref={fileInputRef}
                  id="fotos"
                  name="fotos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              
              {/* Lista de archivos seleccionados */}
              {selectedFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-white mb-1">Archivos seleccionados:</p>
                  <ul className="space-y-1">
                    {selectedFiles.map((fileName, index) => (
                      <li key={index} className="flex items-center justify-between bg-gray-700 rounded px-2 py-1">
                        <span className="text-sm text-gray-200 truncate max-w-[80%]">{fileName}</span>
                        <button 
                          type="button" 
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            
            {/* Términos y condiciones */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terminos" 
                checked={formData.aceptaTerminos}
                onCheckedChange={handleTermsChange}
              />
              <Label htmlFor="terminos" className="text-white">
                Acepto los <a href="#" className="text-key-green hover:underline">términos y condiciones</a> y la <a href="#" className="text-key-green hover:underline">política de privacidad</a>
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
