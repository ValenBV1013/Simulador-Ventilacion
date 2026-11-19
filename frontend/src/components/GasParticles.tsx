'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Creamos una interfaz para los datos de cada partícula
interface Particle {
  id: number;
  width: number;
  height: number;
  left: number;
  duration: number;
  delay: number;
  color: string;
}

export default function GasParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generamos las partículas solo cuando estamos en el navegador
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      width: Math.random() * 150 + 50,
      height: Math.random() * 150 + 50,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      color: i % 2 === 0 ? 'var(--color-accent-dark)' : 'var(--color-primary-dark)',
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full blur-3xl opacity-20 dark:opacity-30"
          style={{
            background: p.color,
            width: p.width,
            height: p.height,
            left: `${p.left}%`,
            bottom: '-20%',
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: ['0vw', '0vw'], // Simplificado para que no se mueva en X
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}