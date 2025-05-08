import React, { useState, useRef } from 'react';
import { useToast } from '../hooks/use-toast';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { X } from 'lucide-react';

const Contact = () => {
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
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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
      
      // Generate URLs for the files to send to the webhook
      const urls = filesArray.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...urls]);
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
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
      const jsonData = {
        ...formData,
        fotos: formData.fotos.map((file, index) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: imageUrls[index] || '' // Include URL for each file
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
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="ciudad">Ciudad</label>
                <input
                  id="ciudad"
                  type="text"
                  name="ciudad"
                  placeholder="Ej. Lima"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.ciudad}
                />
              </div>
              
              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="distrito">Distrito</label>
                <input
                  id="distrito"
                  type="text"
                  name="distrito"
                  placeholder="Ej. Miraflores"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.distrito}
                />
              </div>
              
              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="direccion">Dirección de la propiedad</label>
                <input
                  id="direccion"
                  type="text"
                  name="direccion"
                  placeholder="Av. Ejemplo 123"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.direccion}
                />
              </div>

              {/* Características de la propiedad */}
              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="metraje">Metraje de la propiedad</label>
                <select
                  id="metraje"
                  name="metraje"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.metraje}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Menos de 50">Menos de 50 m²</option>
                  <option value="50-80">50-80 m²</option>
                  <option value="80-120">80-120 m²</option>
                  <option value="120-150">120-150 m²</option>
                  <option value="Más de 150">Más de 150 m²</option>
                </select>
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

              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="banos">Número de baños</label>
                <select
                  id="banos"
                  name="banos"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.banos}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1">1 Baño</option>
                  <option value="2">2 Baños</option>
                  <option value="3+">3+ Baños</option>
                </select>
              </div>
              
              <div>
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="capacidad">Capacidad de huéspedes</label>
                <select
                  id="capacidad"
                  name="capacidad"
                  required
                  className="input-field text-dark-gray"
                  onChange={handleChange}
                  value={formData.capacidad}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="1-2">1-2 Personas</option>
                  <option value="3-4">3-4 Personas</option>
                  <option value="5-6">5-6 Personas</option>
                  <option value="7+">7+ Personas</option>
                </select>
              </div>

              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="amoblado" 
                    checked={formData.amoblado}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="amoblado" className="text-dark-gray">¿La propiedad está amoblada?</Label>
                </div>
              </div>

              {/* Sección de fotos */}
              <div className="md:col-span-2">
                <label className="block text-dark-gray mb-2 text-sm" htmlFor="fotos">Fotos de la propiedad</label>
                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-key-green transition-colors"
                >
                  <p className="text-gray-500">Haz clic para agregar fotos</p>
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
                    <p className="text-sm text-dark-gray mb-1">Archivos seleccionados:</p>
                    <ul className="space-y-1">
                      {selectedFiles.map((fileName, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-100 rounded px-2 py-1">
                          <span className="text-sm text-gray-700 truncate max-w-[80%]">{fileName}</span>
                          <button 
                            type="button" 
                            onClick={() => removeFile(index)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
              
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terminos" 
                    checked={formData.aceptaTerminos}
                    onCheckedChange={handleTermsChange}
                  />
                  <Label htmlFor="terminos" className="text-dark-gray">
                    Acepto los <a href="#" className="text-key-green hover:underline">términos y condiciones</a> y la <a href="#" className="text-key-green hover:underline">política de privacidad</a>
                  </Label>
                </div>
                {formErrors.aceptaTerminos && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.aceptaTerminos}</p>
                )}
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
