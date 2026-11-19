'use client';
import { motion } from 'framer-motion';

export default function GasParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20 dark:opacity-30"
          style={{
            background: i % 2 === 0 ? 'var(--color-accent-dark)' : 'var(--color-primary-dark)',
            width: Math.random() * 150 + 50,
            height: Math.random() * 150 + 50,
            left: `${Math.random() * 100}%`,
            bottom: '-20%',
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: [`${Math.random() * 20 - 10}vw`, `${Math.random() * 40 - 20}vw`],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}