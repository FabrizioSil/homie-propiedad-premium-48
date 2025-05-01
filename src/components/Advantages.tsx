
import React from 'react';

const advantagesList = [
  {
    icon: "chart", 
    title: "Mayor rentabilidad",
    description: "+30% de ingresos vs rentas tradicionales con estrategias de precio dinámicas"
  },
  {
    icon: "calendar",
    title: "Alta ocupación",
    description: "≥90% de ocupación gracias a optimización de listings y posicionamiento"
  },
  {
    icon: "star", 
    title: "Servicio completo",
    description: "Fotos, decoración, limpieza, atención al huésped y mantenimiento incluido"
  },
  {
    icon: "message", 
    title: "Atención 24/7",
    description: "Respuesta inmediata a huéspedes y propietarios en cualquier momento"
  },
  {
    icon: "report", 
    title: "Reportes detallados",
    description: "Informes mensuales con ingresos, gastos y métricas de rendimiento"
  },
  {
    icon: "shield", 
    title: "Tranquilidad total",
    description: "Tu propiedad protegida con seguros especiales para alquileres temporales"
  },
];

const Advantages = () => {
  const renderIcon = (icon: string) => {
    return (
      <div className="w-16 h-16 rounded-full bg-key-green bg-opacity-10 flex items-center justify-center mb-4">
        <div className="w-8 h-8 text-key-green">
          {icon === "chart" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )}
          {icon === "calendar" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
          {icon === "star" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          )}
          {icon === "message" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
          {icon === "report" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
          {icon === "shield" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="ventajas" className="py-20 md:py-24 bg-dark-gray anchor-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Por qué Homie</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Maximiza tus ingresos mientras nosotros nos ocupamos de todo. Administración integral para propietarios que valoran su tiempo y rentabilidad.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantagesList.map((advantage, index) => (
            <div 
              key={index} 
              className="bg-medium-gray bg-opacity-10 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300"
            >
              {renderIcon(advantage.icon)}
              <h3 className="text-xl font-semibold mb-2 text-white">{advantage.title}</h3>
              <p className="text-gray-300">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
