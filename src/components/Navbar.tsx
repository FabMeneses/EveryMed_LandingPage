import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import svgPaths from "../imports/svg-ugrr49c00q";
import { motion, AnimatePresence } from "motion/react";

function MedicalIcon({ isDark }: { isDark?: boolean }) {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 64 61">
      <path d={svgPaths.p23b25c00} fill={isDark ? "#6988e8" : "#5A5C8C"} />
    </svg>
  );
}

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isDark 
          ? scrolled 
            ? 'bg-black/70 border-white/20 shadow-lg' 
            : 'bg-black/40 border-white/10'
          : scrolled
            ? 'bg-white/90 border-gray-300 shadow-lg'
            : 'bg-white/80 border-gray-200'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <MedicalIcon isDark={isDark} />
            <span className="text-foreground font-semibold">EveryMed</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors relative group">
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#servicios" className="text-foreground hover:text-primary transition-colors relative group">
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#planes" className="text-foreground hover:text-primary transition-colors relative group">
              Planes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors relative group">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </div>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="text-foreground" size={20} /> : <Moon className="text-foreground" size={20} />}
            </button>
            <button className="text-foreground hover:text-primary transition-colors">
              Iniciar Sesión
            </button>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-all">
              Registrarse
            </button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="text-foreground" size={20} /> : <Moon className="text-foreground" size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden py-4 space-y-4 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.a 
                href="#inicio" 
                className="block text-foreground hover:text-primary transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Inicio
              </motion.a>
              <motion.a 
                href="#servicios" 
                className="block text-foreground hover:text-primary transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                Servicios
              </motion.a>
              <motion.a 
                href="#planes" 
                className="block text-foreground hover:text-primary transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Planes
              </motion.a>
              <motion.a 
                href="#contacto" 
                className="block text-foreground hover:text-primary transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                Contacto
              </motion.a>
              <motion.div 
                className="flex flex-col gap-2 pt-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button className="text-foreground hover:text-primary transition-colors text-left">
                  Iniciar Sesión
                </button>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-all">
                  Registrarse
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
