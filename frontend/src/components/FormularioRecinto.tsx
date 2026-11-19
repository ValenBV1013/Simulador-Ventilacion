'use client';
import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import RecintoAnimado from './RecintoAnimado';
import { ShieldAlert, CheckCircle2, DollarSign, Calculator, X } from 'lucide-react';

export default function FormularioRecinto() {
  const [datos, setDatos] = useState({ ancho: '', largo: '', alto: '', potencia_kw: '', tiene_rejillas: false, area_rejillas_cm2: '', tiene_evacuacion: false });
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState<any>({});
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setDatos(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value === '' ? '' : parseFloat(value) }));
    if (errores[name]) setErrores((prev: any) => ({ ...prev, [name]: null }));
  };

  const validarFormulario = () => {
    const nuevosErrores: any = {};
    if (!datos.ancho) nuevosErrores.ancho = "Requerido";
    if (!datos.largo) nuevosErrores.largo = "Requerido";
    if (!datos.alto) nuevosErrores.alto = "Requerido";
    if (!datos.potencia_kw) nuevosErrores.potencia_kw = "Requerido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleVerificar = async () => {
    if (!validarFormulario()) { setModalAbierto(true); return; }
    setLoading(true);
    try {
      // Lógica corregida para Vercel y Local
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await axios.post(`${apiUrl}/api/verificar`, { ...datos, area_rejillas_cm2: datos.area_rejillas_cm2 === '' ? 0 : datos.area_rejillas_cm2 });
      setResultado(res.data);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-16 relative">
      <AnimatePresence>
        {modalAbierto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-accent-light dark:to-accent-dark" />
              <button onClick={() => setModalAbierto(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white"><X className="w-6 h-6" /></button>
              <div className="w-16 h-16 bg-red-500/10 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-8 h-8 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">Datos Incompletos</h3>
              <p className="text-slate-500 dark:text-slate-400 text-center mb-8">Por favor, ingresa las dimensiones y potencia.</p>
              <button onClick={() => setModalAbierto(false)} className="w-full bg-slate-900 dark:bg-white/10 hover:bg-slate-800 text-white py-3 rounded-xl font-bold">Entendido</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Contenedor del Formulario con Efecto 3D Hover */}
        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-surface-light dark:bg-surface-dark/50 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-6 mb-6">
            <Calculator className="w-8 h-8 text-primary-light dark:text-primary-dark" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">Parámetros Físicos</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {['ancho', 'largo', 'alto'].map((field) => (
              <div key={field} className="relative">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">{field} (m)</label>
                <input name={field} type="number" placeholder="Ej: 3.5" value={(datos as any)[field]} onChange={handleChange} className={`w-full bg-slate-50 dark:bg-black/40 border rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all ${errores[field] ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-primary-light'}`} step="0.1" />
                {errores[field] && <span className="absolute -bottom-5 left-1 text-[10px] text-red-500 font-medium">{errores[field]}</span>}
              </div>
            ))}
          </div>
          <div className="mb-6 relative">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">Potencia Estufa (kW)</label>
            <input name="potencia_kw" type="number" placeholder="Ej: 10" value={datos.potencia_kw} onChange={handleChange} className={`w-full bg-slate-50 dark:bg-black/40 border rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all ${errores.potencia_kw ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-primary-light'}`} step="0.5" />
            {errores.potencia_kw && <span className="absolute -bottom-5 left-1 text-[10px] text-red-500 font-medium">{errores.potencia_kw}</span>}
          </div>
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10 mb-8 mt-8">
            <label className="flex items-center gap-4 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer group">
              <input name="tiene_rejillas" type="checkbox" checked={datos.tiene_rejillas} onChange={handleChange} className="w-5 h-5 accent-primary-light rounded cursor-pointer" />
              <span>¿Cuenta con rejillas de ventilación?</span>
            </label>
            {datos.tiene_rejillas && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2 pl-9">Área total (cm²)</label>
                <input name="area_rejillas_cm2" type="number" placeholder="Ej: 50" value={datos.area_rejillas_cm2} onChange={handleChange} className="w-[calc(100%-2.25rem)] ml-9 bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-light outline-none" />
              </motion.div>
            )}
            <label className="flex items-center gap-4 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer group">
              <input name="tiene_evacuacion" type="checkbox" checked={datos.tiene_evacuacion} onChange={handleChange} className="w-5 h-5 accent-primary-light rounded cursor-pointer" />
              <span>¿Tiene ducto o campana de evacuación?</span>
            </label>
          </div>
          <motion.button 
            onClick={handleVerificar} 
            disabled={loading} 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59,130,246,0.5)" }} 
            whileTap={{ scale: 0.95 }} 
            className="w-full bg-primary-light dark:bg-primary-dark text-white py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2"
          >
            {loading ? 'Calculando...' : 'Ejecutar Simulación'}
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
          <RecintoAnimado cumple={resultado?.cumple ?? null} tieneEvacuacion={datos.tiene_evacuacion} />
          
          {resultado && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-6 rounded-3xl border shadow-xl ${resultado.cumple ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'}`}>
              <h3 className={`font-bold text-xl mb-4 flex items-center gap-2 ${resultado.cumple ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                {resultado.cumple ? <CheckCircle2 className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                {resultado.cumple ? 'Recinto Apto' : 'Recinto No Apto'}
              </h3>
              <div className="space-y-2">
                {resultado.mensajes.map((m: string, i: number) => <p key={i} className="text-sm text-emerald-800 dark:text-emerald-200 flex gap-2"><span>✓</span> {m}</p>)}
                {resultado.alertas.map((a: string, i: number) => <p key={i} className="text-sm text-red-800 dark:text-red-200 flex gap-2 font-medium"><span>⚠</span> {a}</p>)}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {resultado && !resultado.cumple && resultado.recomendaciones.length > 0 && (
        <div className="pt-12 border-t border-slate-200 dark:border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Alternativas de Solución</h2>
            <p className="text-slate-500 dark:text-slate-400">Opciones técnicas ordenadas por viabilidad.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resultado.recomendaciones.map((rec: any, index: number) => {
              const isEco = rec.tipo === 'economica';
              const isBal = rec.tipo === 'balanceada';
              const borderColor = isEco ? 'border-amber-400/50' : isBal ? 'border-blue-400/50' : 'border-indigo-400/50';
              const badgeColor = isEco ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' : isBal ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400';
              return (
                <motion.div 
                  key={rec.id} 
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }} 
                  transition={{ duration: 0.5, delay: index * 0.15 }} 
                  whileHover={{ y: -8, scale: 1.02, rotateX: 5, rotateY: -5 }} 
                  className={`bg-surface-light dark:bg-surface-dark/50 p-6 rounded-2xl border-2 ${borderColor} shadow-xl flex flex-col h-full relative overflow-hidden group hover:shadow-2xl transition-all`}
                >
                  <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-lg text-xs font-bold uppercase tracking-wider ${badgeColor}`}>
                    Opción {index + 1} • {isEco ? 'Económica' : isBal ? 'Balanceada' : 'Premium'}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-4 mt-4 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">{rec.titulo}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex-grow mb-6 leading-relaxed">{rec.desc}</p>
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase"><DollarSign className="w-4 h-4" /> Costo Est.</span>
                    <span className="font-bold text-slate-900 dark:text-white">{rec.precio}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}