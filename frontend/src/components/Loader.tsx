'use client';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';

export default function Loader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-20 h-20 border-4 border-slate-200 dark:border-white/10 border-t-primary-light dark:border-t-primary-dark rounded-full mb-6"
      />
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2"
      >
        <Wind className="w-6 h-6 text-primary-light dark:text-primary-dark" />
        <span className="text-xl font-bold text-slate-900 dark:text-white tracking-widest uppercase">TermoVent</span>
      </motion.div>
    </motion.div>
  );
}