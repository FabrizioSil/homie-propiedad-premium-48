
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqList = [
  {
    question: "¿Cuánto puedo ganar con mi propiedad?",
    answer: "Los ingresos dependen de factores como ubicación, tamaño y características de tu propiedad. En promedio, nuestros propietarios obtienen entre 30-45% más ingresos que con alquileres tradicionales. Solicita una proyección gratuita para obtener un estimado personalizado."
  },
  {
    question: "¿Cómo funciona el proceso de pago?",
    answer: "Realizamos transferencias mensuales a tu cuenta bancaria, generalmente entre el 10-15 de cada mes. Deducimos nuestra comisión y los gastos operativos (limpieza, suministros, etc.), y enviamos un informe detallado con todas las transacciones."
  },
  {
    question: "¿Puedo usar mi propiedad ocasionalmente?",
    answer: "Sí, puedes bloquear fechas para uso personal a través de nuestro calendario. Recomendamos avisar con al menos 30 días de anticipación para evitar conflictos con reservas ya confirmadas."
  },
  {
    question: "¿Qué sucede si hay daños en mi propiedad?",
    answer: "Todos los huéspedes dejan un depósito de seguridad. Además, contamos con un seguro especial para alquileres temporales que cubre daños mayores. Nuestro equipo realiza inspecciones después de cada estadía para identificar cualquier problema."
  },
  {
    question: "¿Cuál es el plazo mínimo de contrato?",
    answer: "Trabajamos con un contrato inicial de 6 meses, renovable automáticamente. Esto nos permite implementar estrategias efectivas y demostrar resultados. Si deseas terminar la relación, solicitamos un aviso con 30 días de anticipación."
  },
  {
    question: "¿Qué necesito proporcionar para mi propiedad?",
    answer: "Tu propiedad debe estar equipada con muebles básicos, electrodomésticos y servicios (agua, luz, internet). Nosotros nos encargamos de la decoración adicional, ropa de cama, toallas y artículos de tocador para optimizar la experiencia del huésped y las fotos del listado."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-dark-gray anchor-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">Preguntas frecuentes</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Todo lo que necesitas saber sobre nuestro servicio de administración para Airbnb.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqList.map((faq, index) => (
            <div key={index} className="mb-4">
              <button 
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-colors ${
                  activeIndex === index ? 'bg-key-green bg-opacity-10' : 'bg-dark-gray bg-opacity-40 hover:bg-opacity-60'
                }`}
              >
                <span className="font-medium text-white">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="text-key-green" size={20} />
                ) : (
                  <ChevronDown className="text-key-green" size={20} />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-5 text-gray-300 bg-dark-gray bg-opacity-20 rounded-b-lg">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
