
import React from 'react';

const processList = [
  {
    number: "01",
    title: "Evaluación inicial",
    description: "Analizamos tu propiedad y ubicación para estimar ingresos potenciales."
  },
  {
    number: "02",
    title: "Preparación y optimización",
    description: "Producción fotográfica, diseño interior y creación de perfiles atractivos."
  },
  {
    number: "03",
    title: "Gestión completa",
    description: "Nos encargamos de reservas, comunicación, limpieza y mantenimiento."
  },
  {
    number: "04",
    title: "Reportes mensuales",
    description: "Recibe informes detallados de ingresos, gastos y próximas reservas."
  }
];

const Process = () => {
  return (
    <section id="proceso" className="py-20 md:py-24 bg-medium-gray bg-opacity-5 anchor-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Nuestro proceso</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Un servicio simplificado y eficiente para que tú solo te ocupes de recibir tus ingresos.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-key-green bg-opacity-30 -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processList.map((process, index) => (
              <div key={index} className="relative">
                <div className="bg-dark-gray rounded-xl p-6 flex flex-col items-center text-center h-full border border-key-green border-opacity-10 hover:border-opacity-30 transition-all">
                  <div className="w-12 h-12 rounded-full bg-key-green flex items-center justify-center mb-4 text-dark-gray font-semibold relative z-10">
                    {process.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{process.title}</h3>
                  <p className="text-gray-300">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
