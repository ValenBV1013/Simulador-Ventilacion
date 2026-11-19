'use client';
import { motion } from 'framer-motion';
import { Wind, Menu } from 'lucide-react';
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

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#simulador" className="hover:text-primary-light dark:hover:text-white transition-colors">Simulador</a>
          <a href="#normativas" className="hover:text-primary-light dark:hover:text-white transition-colors">Normativas</a>
          <a href="#faq" className="hover:text-primary-light dark:hover:text-white transition-colors">FAQ</a>
          <a href="#simulador" className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white/10 text-white dark:text-white hover:bg-slate-800 dark:hover:bg-white/20 transition-all">
            Comenzar Análisis
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button className="text-slate-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}