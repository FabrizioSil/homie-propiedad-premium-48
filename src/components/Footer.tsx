
import React from 'react';
import { TiktokIcon, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="py-12 bg-dark-gray border-t border-key-green border-opacity-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img src="/lovable-uploads/0e97e210-63de-4b39-8d4c-a0a7b6b6e724.png" alt="Homie Logo" className="h-14 md:h-16 object-contain" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-300">
            <a href="#ventajas" className="hover:text-key-green transition-colors">Ventajas</a>
            <a href="#proceso" className="hover:text-key-green transition-colors">Proceso</a>
            <a href="#testimonios" className="hover:text-key-green transition-colors">Testimonios</a>
            <a href="#faq" className="hover:text-key-green transition-colors">FAQ</a>
            <a href="#contacto" className="hover:text-key-green transition-colors">Contacto</a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Homie Perú. Todos los derechos reservados.
          </p>
          
          <div className="flex justify-center space-x-6">
            <a href="https://www.tiktok.com/@visionarios?_t=ZM-8wPXz61id3n&_r=1" className="text-gray-400 hover:text-key-green" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">TikTok</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.instagram.com/homie_peruv/" className="text-gray-400 hover:text-key-green" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="http://wa.link/5qy3uq" className="text-gray-400 hover:text-key-green" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">WhatsApp</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M20.288 10.877c0 4.992-4.078 9.069-9.07 9.069a9.027 9.027 0 01-4.303-1.086L2 20.654l1.817-4.887a9.004 9.004 0 01-1.186-4.888c0-4.992 4.078-9.069 9.07-9.069 4.989 0 9.07 4.074 9.07 9.067zm-4.716 5.158c.219.122.366.19.422.285.056.094.056.531-.131 1.042-.188.51-1.09.981-1.5 1.042-.385.057-1.108.094-2.234-.312-1.942-.685-3.57-2.285-4.718-3.505-.597-.635-1.165-1.458-1.677-2.311-.51-.854-.169-1.854.131-2.133.3-.281.656-.469.938-.563.281-.094.562-.056.75.094.188.15.394.487.6.823.206.335.337.656.45.75.112.094.169.262.056.469-.112.206-.169.337-.337.525-.169.188-.356.419-.525.563-.169.15-.337.319-.169.6.169.281.75 1.196 1.614 1.94 1.115.935 2.003 1.233 2.31 1.346.3.112.525.094.712-.075.188-.169.413-.45.638-.731.169-.225.375-.244.6-.169.225.075 1.408.656 1.651.787z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
