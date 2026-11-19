'use client';

// ============================================================================
// PÁGINA PRINCIPAL - TERMOVENT
// ============================================================================
// Esta es la landing page del proyecto. Incluye el Hero, el simulador,
// la sección de normativas, sobre nosotros (con el texto del SENA),
// aplicaciones prácticas, reseñas, FAQ, contacto y footer.
// ============================================================================

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Componentes internos
import FormularioRecinto from '@/components/FormularioRecinto';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import GasParticles from '@/components/GasParticles';

// Iconos
import { 
  ArrowRight, Activity, ShieldCheck, Thermometer, Waves, 
  Star, Quote, Info, Flame, Droplets, Zap, Wind, CheckCircle, 
  Gauge, Beaker, MapPin, Mail, Phone, Send 
} from 'lucide-react';

// ============================================================================
// DATOS ESTÁTICOS
// ============================================================================

// Testimonios para el carrusel infinito
const TESTIMONIOS = [
  { name: "Ing. Carlos R.", role: "Especialista en Gas", text: "Esta herramienta es exactamente lo que necesitábamos para dimensionar la ventilación. Los cálculos son exactos." },
  { name: "Arq. Laura M.", role: "Diseñadora Residencial", text: "El cálculo termodinámico es preciso. Me ayuda a justificar las rejillas de ventilación en los planos de los clientes." },
  { name: "Felipe T.", role: "Propietario", text: "Pensé que mi estufa funcionaba bien, pero el simulador me alertó que requería una rejilla más grande. Me salvó de un susto." },
  { name: "Dra. Ana G.", role: "Ingeniera Química", text: "La interfaz es espectacular. Explica de forma muy visual cómo la falta de ventilación puede generar monóxido de carbono letal." },
  { name: "Jorge M.", role: "Contratista", text: "Lo uso en cada obra que hago. Me ahorra tiempo calculando el área de las rejillas y me da un sustento técnico." }
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function Home() {
  // Estado para el Loader inicial
  const [loading, setLoading] = useState(true);

  // Simulamos una carga de 1.5 segundos al entrar
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Pantalla de Carga */}
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      <main className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-800 dark:text-slate-200 font-sans selection:bg-accent-light selection:text-white transition-colors duration-300 relative overflow-hidden">
        
        {/* ------------------------------------------------------------------
            EFECTOS DE FONDO
            ------------------------------------------------------------------ */}
        <GasParticles />
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute top-[10%] left-[5%] text-6xl font-mono text-slate-900 dark:text-white rotate-12">PV = nRT</div>
          <div className="absolute top-[40%] right-[10%] text-5xl font-mono text-slate-900 dark:text-white -rotate-12">Re = ρvD/μ</div>
          <div className="absolute bottom-[20%] left-[20%] text-7xl font-mono text-slate-900 dark:text-white rotate-6">Q = mcΔT</div>
        </div>

        {/* Header (Navegación) */}
        <Header />

        {/* ------------------------------------------------------------------
            1. HERO SECTION
            ------------------------------------------------------------------ */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 dark:opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-bg-light/80 to-transparent dark:from-bg-dark dark:via-bg-dark/80" />
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-surface-dark border border-slate-300 dark:border-white/10 backdrop-blur-md mb-8">
              <Beaker className="w-4 h-4 text-accent-light dark:text-accent-dark" />
              <span className="text-sm font-medium tracking-wide text-slate-700 dark:text-slate-300">Laboratorio de Termodinámica Aplicada</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
              Control Físico y Ambiental <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark">
                de Ventilación
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Simulador de dinámica de fluidos y combustión. Verifica si tu recinto es seguro para estufas, calentadores o chimeneas.
            </p>
            <a href="#simulador" className="inline-flex items-center gap-2 bg-accent-light dark:bg-accent-dark text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-colors shadow-[0_0_20px_rgba(234,88,12,0.4)]">
              Ejecutar Simulación <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            2. SIMULADOR
            ------------------------------------------------------------------ */}
        <section id="simulador" className="relative z-10 py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Simulador Termodinámico</h2>
            <p className="text-slate-500 dark:text-slate-400">Ingresa los datos de tu recinto para verificar si cumple con la normativa.</p>
          </div>
          <FormularioRecinto />
        </section>

        {/* ------------------------------------------------------------------
            3. NORMATIVAS Y EQUIPOS
            ------------------------------------------------------------------ */}
        <section id="normativas" className="relative z-10 py-24 bg-surface-light dark:bg-surface-dark/30 border-y border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">¿Cómo Funciona?</h2>
              <p className="text-slate-500 dark:text-slate-400">Nuestro sistema aplica las leyes de la física para garantizar tu seguridad.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                { icon: ShieldCheck, color: "text-primary-light dark:text-primary-dark", bg: "bg-primary-light/10", title: "NTC 3631", desc: "Norma técnica que regula la ventilación y evacuación de gases." },
                { icon: Gauge, color: "text-accent-light dark:text-accent-dark", bg: "bg-accent-light/10", title: "4.8 m³/kW", desc: "Volumen mínimo de aire requerido por kilovatio de potencia." },
                { icon: Waves, color: "text-emerald-500", bg: "bg-emerald-500/10", title: "6 cm²/kW", desc: "Área de ventilación necesaria en recintos confinados." }
              ].map((item, i) => (
                <div key={i} className="bg-bg-light dark:bg-surface-dark p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg flex flex-col items-center text-center group">
                  <div className={`p-4 ${item.bg} rounded-full mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-10 h-10 ${item.color}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mb-10">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest">Equipos analizados por el sistema</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Flame, name: "Estufas a Gas" },
                { icon: Droplets, name: "Calentadores" },
                { icon: Zap, name: "Estufas Eléctricas" },
                { icon: Wind, name: "Chimeneas" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4 group-hover:bg-accent-light/10 transition-all">
                    <item.icon className="w-8 h-8 text-slate-500 dark:text-slate-400 group-hover:text-accent-light transition-colors" />
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-bold">{item.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            4. SOBRE NOSOTROS (ACTUALIZADO CON EL SENA)
            ------------------------------------------------------------------ */}
        <section id="sobre-nosotros" className="relative z-10 py-24 bg-slate-100 dark:bg-[#0f172a] border-b border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <span className="text-primary-light dark:text-primary-dark font-bold tracking-widest uppercase text-sm mb-2 block">Conoce nuestra historia</span>
                <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Sobre Nosotros</h2>
                
                {/* INICIO DEL TEXTO ACTUALIZADO */}
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Somos un equipo de <strong>aprendices de ADSO (Análisis y Desarrollo de Software) del SENA</strong>. Este sitio web nació como un proyecto académico para la clase de Física de nuestro profesor, con el objetivo de aplicar los conceptos teóricos de termodinámica y mecánica de fluidos en una herramienta real y funcional.
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Lo que comenzó como una tarea de clase, se convirtió en una plataforma diseñada para ayudar a las personas a garantizar la seguridad de sus hogares. No se trata solo de colocar una estufa, se trata de entender cómo se comporta el oxígeno, el monóxido de carbono y el flujo de aire en un espacio confinado para salvar vidas.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Proyecto formativo del SENA - ADSO', 
                    'Cálculo basado en el Volumen de Aire (NTC 3631)', 
                    'Dimensionamiento de Área de Rejillas (6 cm²/kW)', 
                    'Prevención de Intoxicación por Monóxido de Carbono (CO)'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-5 h-5 text-primary-light dark:text-primary-dark shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                {/* FIN DEL TEXTO ACTUALIZADO */}
              </motion.div>
              
              {/* Imagen grande de Sobre Nosotros */}
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10">
                <img 
                  src="/images/About.jpeg" // <-- TU IMAGEN LOCAL
                  alt="Ingeniería TermoVent" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-bold text-xl">Proyecto de Física Aplicada - SENA ADSO</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            4.5. APLICACIONES PRÁCTICAS
            ------------------------------------------------------------------ */}
        <section id="aplicaciones" className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Aplicaciones Prácticas</h2>
              <p className="text-slate-500 dark:text-slate-400">Analizamos los distintos equipos que pueden afectar la termodinámica de tu hogar.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { img: "/images/estufa.webp", title: "Estufas de Cocina", desc: "El consumo de oxígeno y la generación de CO en espacios cerrados." },
                { img: "/images/calentador.webp", title: "Calentadores a Gas", desc: "La evacuación de vapores y la importancia de los ductos de salida." },
                { img: "/images/chimenea.webp", title: "Chimeneas y Leña", desc: "El tiro de aire y la convección natural en recintos amplios." },
                { img: "/images/planos.jpg", title: "Cálculos y Planos", desc: "La importancia de la termodinámica en el diseño arquitectónico." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-surface-light dark:bg-surface-dark rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            5. CARRUSEL DE RESEÑAS
            ------------------------------------------------------------------ */}
        <section className="relative z-10 py-24 bg-surface-light dark:bg-black/20 border-y border-slate-200 dark:border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Validado por Expertos</h2>
              <p className="text-slate-500 dark:text-slate-400">Profesionales que confían en nuestros cálculos.</p>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative w-full flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div className="flex gap-6 w-max" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }}>
              {[...TESTIMONIOS, ...TESTIMONIOS].map((t, i) => (
                <div key={i} className="w-[350px] flex-shrink-0 bg-bg-light dark:bg-surface-dark p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent-light dark:fill-accent-dark text-accent-light dark:text-accent-dark" />)}
                  </div>
                  <Quote className="w-8 h-8 text-slate-200 dark:text-white/10 mb-2" />
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 italic leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center font-bold text-white">{t.name.charAt(0)}</div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h5>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ------------------------------------------------------------------
            6. PREGUNTAS FRECUENTES (FAQ)
            ------------------------------------------------------------------ */}
        <section id="faq" className="relative z-10 py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Preguntas Frecuentes</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "¿Qué es un recinto confinado?", a: "Es un espacio cerrado cuyo volumen es menor a 4.8 m³ por cada kW de potencia del equipo instalado." },
                { q: "¿Por qué es peligroso no tener evacuación de gases?", a: "La combustión genera Monóxido de Carbono (CO). Este es un gas inodoro, incoloro y altamente letal si no se evacua." },
                { q: "¿Cómo sé si mi rejilla es del tamaño adecuado?", a: "La física de fluidos establece que el área total debe ser de al menos 6 cm² por cada kW. Una estufa de 10 kW requiere mínimo 60 cm²." }
              ].map((faq, i) => (
                <div key={i} className="bg-surface-light dark:bg-surface-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-2">
                    <Info className="w-5 h-5 text-primary-light dark:text-primary-dark shrink-0" /> {faq.q}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm pl-8 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            7. CONTACTO Y MAPA
            ------------------------------------------------------------------ */}
        <section id="contacto" className="relative z-10 py-24 bg-surface-light dark:bg-surface-dark/30 border-t border-slate-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Contacto y Ubicación</h2>
              <p className="text-slate-500 dark:text-slate-400">¿Tienes dudas? Escríbenos o visítanos en nuestra oficina.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Formulario de Contacto */}
              <div className="bg-bg-light dark:bg-surface-dark p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Nombre</label>
                      <input type="text" className="w-full bg-slate-100 dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-light outline-none" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Email</label>
                      <input type="email" className="w-full bg-slate-100 dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-light outline-none" placeholder="tu@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Asunto</label>
                    <input type="text" className="w-full bg-slate-100 dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-light outline-none" placeholder="Ej: Asesoría técnica" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Mensaje</label>
                    <textarea rows={4} className="w-full bg-slate-100 dark:bg-black/30 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-light outline-none resize-none" placeholder="Escribe tu mensaje aquí..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-accent-light dark:bg-accent-dark hover:bg-orange-700 text-white py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2">
                    Enviar Mensaje <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Mapa de Google Maps */}
              <div className="flex flex-col gap-6">
                <div className="w-full h-[350px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0762209728735!2d-75.56814908523067!3d6.25119099548249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429d4b938d27d%3A0x6b7f1144b7e0b7c!2sBello%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1610000000000!5m2!1ses!2sco" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    className="absolute inset-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 dark:invert dark:hue-rotate-180"
                  ></iframe>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-bg-light dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-4">
                     <div className="p-3 bg-primary-light/10 rounded-full text-primary-light"><MapPin className="w-6 h-6" /></div>
                     <div>
                       <h4 className="font-bold text-slate-900 dark:text-white">Ubicación</h4>
                       <p className="text-sm text-slate-500 dark:text-slate-400">Bello, Antioquia</p>
                     </div>
                   </div>
                   <div className="bg-bg-light dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-4">
                     <div className="p-3 bg-accent-light/10 rounded-full text-accent-light"><Phone className="w-6 h-6" /></div>
                     <div>
                       <h4 className="font-bold text-slate-900 dark:text-white">Teléfono</h4>
                       <p className="text-sm text-slate-500 dark:text-slate-400">+57 300 000 0000</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            8. FOOTER PROFESIONAL
            ------------------------------------------------------------------ */}
        <footer className="relative z-10 bg-slate-900 dark:bg-[#050810] text-slate-300 py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Logo y Descripción */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <Wind className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white tracking-wide">
                  Termo<span className="text-primary-light dark:text-primary-dark">Vent</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                Plataforma de simulación termodinámica diseñada para garantizar la seguridad de los espacios residenciales. Cumplimos con las normativas técnicas colombianas para la instalación de gas.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-light/20 text-slate-400 hover:text-primary-light flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-light/20 text-slate-400 hover:text-primary-light flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-light/20 text-slate-400 hover:text-primary-light flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>

            {/* Enlaces Rápidos */}
            <div>
              <h4 className="text-white font-bold mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#simulador" className="hover:text-primary-light transition-colors">Simulador</a></li>
                <li><a href="#normativas" className="hover:text-primary-light transition-colors">Normativas</a></li>
                <li><a href="#sobre-nosotros" className="hover:text-primary-light transition-colors">Sobre Nosotros</a></li>
                <li><a href="#faq" className="hover:text-primary-light transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-white font-bold mb-6">Contacto</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-light shrink-0" />
                  <span>Bello, Antioquia<br/>Colombia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-light shrink-0" />
                  <span>+57 300 000 0000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-light shrink-0" />
                  <span>contacto@termovent.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TermoVent. Todos los derechos reservados.</p>
            <p>Proyecto de Física e Ingeniería - Next.js & FastAPI.</p>
          </div>
        </footer>
      </main>
    </>
  );
}