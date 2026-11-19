'use client';
import { motion } from 'framer-motion';

export default function RecintoAnimado({ cumple, tieneEvacuacion }: { cumple: boolean | null, tieneEvacuacion: boolean }) {
  const colorPared = cumple === false ? '#ef4444' : cumple === true ? '#10b981' : '#64748b';

  return (
    <div className="relative w-full h-[400px] bg-slate-100 dark:bg-surface-dark/50 rounded-3xl border border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-inner transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-300/30 dark:from-blue-900/20 via-transparent to-transparent" />
      
      <motion.svg viewBox="0 0 200 160" className="w-80 h-auto z-10" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        {/* Techo */}
        <polygon points="100,10 190,70 10,70" fill="#475569" stroke="#1e293b" strokeWidth="2" />
        
        {/* Paredes */}
        <motion.rect x="15" y="70" width="80" height="70" fill={colorPared} opacity={0.8} stroke="#1e293b" strokeWidth="2" animate={{ fill: colorPared }} />
        <motion.rect x="105" y="70" width="80" height="70" fill={colorPared} opacity={0.8} stroke="#1e293b" strokeWidth="2" animate={{ fill: colorPared }} />
        
        {/* Puerta */}
        <rect x="80" y="100" width="40" height="40" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
        
        {/* Ventana */}
        <rect x="30" y="85" width="30" height="20" fill="#38bdf8" opacity={0.5} stroke="#1e293b" strokeWidth="2" />
        
        {/* Estufa y Fuego */}
        <rect x="130" y="110" width="35" height="30" fill="#1e293b" rx="2" />
        {cumple && (
          <>
            <motion.ellipse cx="147.5" cy="105" rx="8" ry="12" fill="#f59e0b" animate={{ scaleY: [1, 1.2, 0.9, 1], opacity: [0.8, 1, 0.7, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
            {tieneEvacuacion && (
              <motion.circle cx="147.5" cy="90" r="4" fill="#94a3b8" animate={{ y: [-10, -60], opacity: [1, 0], scale: [1, 3] }} transition={{ repeat: Infinity, duration: 2.5 }} />
            )}
          </>
        )}
      </motion.svg>

      <div className="absolute bottom-6 flex justify-center w-full">
        <span className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg ${cumple === false ? 'bg-red-500/20 text-red-500 border border-red-500/50' : cumple === true ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/50' : 'bg-slate-500/20 text-slate-500 border border-slate-500/50'}`}>
          {cumple === null ? 'Esperando Análisis' : cumple ? 'Sistema Seguro' : 'Sistema en Riesgo'}
        </span>
      </div>
    </div>
  );
}