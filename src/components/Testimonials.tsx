import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const testimonialsList = [{
  name: "Carlos Mendoza",
  location: "Miraflores, Lima",
  quote: "Mi departamento pasó de estar vacío varios meses al año a tener una ocupación del 92%. Los ingresos superaron mis expectativas y el servicio es impecable.",
  rating: 5,
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a"
}, {
  name: "Ana María Fuentes",
  location: "Barranco, Lima",
  quote: "Homie transformó mi experiencia como propietaria. Antes me estresaba con cada inquilino, ahora solo reviso el reporte mensual y los ingresos a mi cuenta.",
  rating: 5,
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
}, {
  name: "Miguel Sánchez",
  location: "San Isidro, Lima",
  quote: "La diferencia en ingresos es notable. Pasé de un alquiler tradicional a ganar un 38% más con Airbnb, sin tener que ocuparme de nada.",
  rating: 5,
  image: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4"
}];
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextTestimonial = () => {
    setActiveIndex(prev => prev === testimonialsList.length - 1 ? 0 : prev + 1);
  };
  const prevTestimonial = () => {
    setActiveIndex(prev => prev === 0 ? testimonialsList.length - 1 : prev - 1);
  };
  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }).map((_, i) => <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-key-green' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>);
  };
  return <section id="testimonios" className="py-20 md:py-24 bg-dark-gray anchor-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Lo que dicen nuestros propietarios</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre por qué los propietarios confían en Homie para maximizar el potencial de sus propiedades.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Controls */}
          <div className="hidden md:flex absolute top-1/2 -left-12 transform -translate-y-1/2 z-10">
            <button onClick={prevTestimonial} className="p-2 rounded-full bg-key-green bg-opacity-10 text-key-green hover:bg-opacity-20 transition-all">
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="hidden md:flex absolute top-1/2 -right-12 transform -translate-y-1/2 z-10">
            <button onClick={nextTestimonial} className="p-2 rounded-full bg-key-green bg-opacity-10 text-key-green hover:bg-opacity-20 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Testimonial */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="rounded-lg overflow-hidden h-64 sm:h-80 md:h-96">
              <img src={testimonialsList[activeIndex].image} alt={testimonialsList[activeIndex].name} loading="lazy" className="w-full h-object-cover object-scale-down" />
            </div>
            
            <div className="p-6 md:p-0">
              <div className="flex mb-3">
                {renderStars(testimonialsList[activeIndex].rating)}
              </div>
              
              <blockquote className="text-xl font-light italic mb-6 text-gray-200">
                "{testimonialsList[activeIndex].quote}"
              </blockquote>
              
              <div>
                <h4 className="font-semibold text-white">{testimonialsList[activeIndex].name}</h4>
                <p className="text-key-green">{testimonialsList[activeIndex].location}</p>
              </div>
            </div>
          </div>
          
          {/* Mobile controls */}
          <div className="flex justify-center mt-8 space-x-4 md:hidden">
            <button onClick={prevTestimonial} className="p-2 rounded-full bg-key-green bg-opacity-10 text-key-green hover:bg-opacity-20 transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="flex space-x-2">
              {testimonialsList.map((_, index) => <button key={index} onClick={() => setActiveIndex(index)} className={`w-2.5 h-2.5 rounded-full transition-all ${index === activeIndex ? 'bg-key-green' : 'bg-gray-500'}`} />)}
            </div>
            <button onClick={nextTestimonial} className="p-2 rounded-full bg-key-green bg-opacity-10 text-key-green hover:bg-opacity-20 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;