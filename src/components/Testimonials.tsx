
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const testimonialsList = [{
  name: "Pilar Reyes",
  location: "Miraflores, Lima",
  quote: "Mi departamento pasó de estar vacío varios meses al año a tener una ocupación del 92%. Los ingresos superaron mis expectativas y el servicio es impecable.",
  rating: 5,
  image: "/lovable-uploads/09abe06c-fbe4-4e1b-b6c7-785074339a89.png"
}, {
  // Cambiado de Ana María Fuentes a Carlos Montalva, con nueva foto y ubicación
  name: "Carlos Montalva",
  location: "San Isidro, Lima",
  quote: "Homie transformó mi experiencia como propietaria. Antes me estresaba con cada inquilino, ahora solo reviso el reporte mensual y los ingresos a mi cuenta.",
  rating: 5,
  image: "/lovable-uploads/19e931c5-eb99-427e-b087-0cc5cd335abe.png"
}, {
  name: "David Bruley",
  location: "San Isidro, Lima",
  quote: "En mi anterior administración tenia menos del 50% de ocupación, hoy en día mi apartamento no baja de 80% de ocupación y el monto que recibo me mantiene muy contento",
  rating: 5,
  image: "/lovable-uploads/1ebbbff7-47d3-4143-9ef6-82b88329c0c7.png"
}, {
  name: "Elvira y Rolando",
  location: "San Isidro, Lima",
  quote: "La diferencia en ingresos es notable. Pasé de un alquiler tradicional a ganar un 38% más con Airbnb, sin tener que ocuparme de nada.",
  rating: 5,
  image: "/lovable-uploads/fbe2a393-c401-4e82-aaee-fd8709ef4014.png"
}];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-key-green' : 'text-gray-400'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonios" className="py-20 md:py-24 bg-[#F7F7F7] anchor-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-dark-gray">Lo que dicen nuestros propietarios</h2>
          <p className="text-lg md:text-xl text-medium-gray max-w-3xl mx-auto">
            Descubre por qué los propietarios confían en Homie para maximizar el potencial de sus propiedades.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonialsList.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="grid md:grid-cols-5 gap-6 items-center px-1">
                    <div className="md:col-span-2 rounded-lg overflow-hidden h-64 sm:h-80 relative">
                      <Avatar className="w-full h-full rounded-xl">
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <AvatarFallback className="w-full h-full bg-gray-200">
                          <Skeleton className="w-full h-full" />
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="md:col-span-3 p-6 md:pl-12">
                      <div className="flex mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      <blockquote className="text-xl font-light italic mb-6 text-dark-gray">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div>
                        <h4 className="font-semibold text-dark-gray">{testimonial.name}</h4>
                        <p className="text-key-green">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-key-green bg-opacity-10 text-key-green hover:bg-opacity-20" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-key-green bg-opacity-10 text-key-green hover:bg-opacity-20" />
            </div>
            
            {/* Mobile controls */}
            <div className="flex justify-center mt-8 space-x-4 md:hidden">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-key-green bg-opacity-10 text-key-green hover:bg-opacity-20" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-key-green bg-opacity-10 text-key-green hover:bg-opacity-20" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

