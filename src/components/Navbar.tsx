
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-gray bg-opacity-90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 lg:py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <img src="/lovable-uploads/0e97e210-63de-4b39-8d4c-a0a7b6b6e724.png" alt="Homie Logo" loading="eager" className="h-10 md:h-12 object-fill" />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <button onClick={() => scrollToSection('ventajas')} className="text-white hover:text-key-green transition-colors">
            Ventajas
          </button>
          <button onClick={() => scrollToSection('proceso')} className="text-white hover:text-key-green transition-colors">
            Proceso
          </button>
          <button onClick={() => scrollToSection('testimonios')} className="text-white hover:text-key-green transition-colors">
            Testimonios
          </button>
          <button onClick={() => scrollToSection('faq')} className="text-white hover:text-key-green transition-colors">
            FAQ
          </button>
          <button onClick={() => scrollToSection('contacto')} className="text-white hover:text-key-green transition-colors">
            Contacto
          </button>
          <button onClick={() => scrollToSection('contacto')} className="btn-primary">
            Quiero mi proyección gratis
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-dark-gray bg-opacity-95 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen py-4' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <button onClick={() => scrollToSection('ventajas')} className="text-white py-2 hover:text-key-green transition-colors">
            Ventajas
          </button>
          <button onClick={() => scrollToSection('proceso')} className="text-white py-2 hover:text-key-green transition-colors">
            Proceso
          </button>
          <button onClick={() => scrollToSection('testimonios')} className="text-white py-2 hover:text-key-green transition-colors">
            Testimonios
          </button>
          <button onClick={() => scrollToSection('faq')} className="text-white py-2 hover:text-key-green transition-colors">
            FAQ
          </button>
          <button onClick={() => scrollToSection('contacto')} className="text-white py-2 hover:text-key-green transition-colors">
            Contacto
          </button>
          <button onClick={() => scrollToSection('contacto')} className="btn-primary mt-4">
            Quiero mi proyección gratis
          </button>
        </div>
      </div>
    </nav>;
};

export default Navbar;
