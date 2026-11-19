'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center shadow-lg">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-wide transition-colors">
            Termo<span className="text-primary-light dark:text-primary-dark">Vent</span>
          </span>
        </div>

        {/* Menú de Escritorio */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#simulador" className="hover:text-primary-light dark:hover:text-white transition-colors">Simulador</a>
          <a href="#normativas" className="hover:text-primary-light dark:hover:text-white transition-colors">Normativas</a>
          <a href="#sobre-nosotros" className="hover:text-primary-light dark:hover:text-white transition-colors">Nosotros</a>
          <a href="#faq" className="hover:text-primary-light dark:hover:text-white transition-colors">FAQ</a>
          <a href="#simulador" className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white/10 text-white dark:text-white hover:bg-slate-800 dark:hover:bg-white/20 transition-all">
            Comenzar Análisis
          </a>
          <ThemeToggle />
        </nav>

        {/* Botón de Menú Móvil y Tema */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            className="text-slate-900 dark:text-white p-2" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil Animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-light dark:bg-bg-dark border-b border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <a href="#simulador" onClick={() => setIsOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium hover:text-primary-light dark:hover:text-primary-dark transition-colors">Simulador</a>
              <a href="#normativas" onClick={() => setIsOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium hover:text-primary-light dark:hover:text-primary-dark transition-colors">Normativas</a>
              <a href="#sobre-nosotros" onClick={() => setIsOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium hover:text-primary-light dark:hover:text-primary-dark transition-colors">Sobre Nosotros</a>
              <a href="#faq" onClick={() => setIsOpen(false)} className="text-slate-700 dark:text-slate-300 font-medium hover:text-primary-light dark:hover:text-primary-dark transition-colors">FAQ</a>
              <a href="#simulador" onClick={() => setIsOpen(false)} className="mt-2 text-center px-6 py-3 rounded-xl bg-primary-light text-white font-bold">Comenzar Análisis</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}