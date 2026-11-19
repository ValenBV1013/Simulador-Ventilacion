# PROYECTO TERMOVENT - GUÍA COMPLETA DE INSTALACIÓN Y CÓDIGO
# =====================================================================
# Este documento contiene TODO el proyecto: comandos de terminal,
# configuraciones de Docker, Next.js, Tailwind y la documentación general.
# =====================================================================

# =====================================================================
# 1. DOCUMENTACIÓN DEL PROYECTO (README.md)
# =====================================================================

# TermoVent - Simulador Termodinámico de Ventilación

**TermoVent** es una plataforma web interactiva diseñada para verificar si un recinto (cocina, baño, habitación) cumple con las medidas de ventilación y seguridad necesarias para la instalación de estufas, calentadores o chimeneas.

Desarrollado por **aprendices de ADSO (Análisis y Desarrollo de Software) del SENA** para la clase de Física. Aplica conceptos de termodinámica y mecánica de fluidos (volumen mínimo de aire y área de rejillas) para prevenir intoxicaciones por Monóxido de Carbono (CO).

## Características
*   **Simulador Termodinámico:** Calcula volumen y área de ventilación según NTC 3631.
*   **Interfaz Interactiva:** Animaciones fluidas (Framer Motion) y casita 2D dinámica.
*   **Recomendaciones:** Tarjetas con soluciones ordenadas por viabilidad (Económica, Balanceada, Premium).
*   **Diseño Premium:** Glassmorphism, modo oscuro/claro, 100% responsive.
*   **Dockerizado:** Listo para ejecutarse en cualquier entorno.

## Tecnologías
*   **Frontend:** Next.js 16, React, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, Axios.
*   **Backend:** Python 3.11, FastAPI, Uvicorn, Pydantic.
*   **DevOps:** Docker, Docker Compose, Vercel (Frontend), Render (Backend).

## Enlaces
*   🌐 **Live Demo:** https://simulador-ventilacion.vercel.app/
*   💻 **Repositorio GitHub:** https://github.com/ValenBV1013/Simulador-Ventilacion
*   ⚙️ **API Docs:** https://simulador-ventilacion-backend.onrender.com/docs

---

# =====================================================================
# 2. COMANDOS DE TERMINAL (BASH / POWERSHELL)
# =====================================================================

## Clonar el repositorio
git clone https://github.com/ValenBV1013/Simulador-Ventilacion.git
cd Simulador_Ventilacion

## Ejecución con Docker (Recomendado)
docker-compose up --build
# Frontend: http://localhost:3000
# Backend: http://localhost:8000/docs

## Ejecución Manual (sin Docker)
# Terminal 1 - Backend
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev

## Comandos para subir a GitHub
git add .
git commit -m "feat: proyecto completo"
git branch -M main
git remote add origin https://github.com/ValenBV1013/Simulador-Ventilacion.git
git push -u origin main

---

# =====================================================================
# 3. ARCHIVOS DE CONFIGURACIÓN (COPIAR EN SUS RESPECTIVAS CARPETAS)
# =====================================================================

# ---------------------------------------------------------------------
# 3.1. docker-compose.yml (En la raíz del proyecto)
# ---------------------------------------------------------------------
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000

# ---------------------------------------------------------------------
# 3.2. backend/Dockerfile
# ---------------------------------------------------------------------
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# ---------------------------------------------------------------------
# 3.3. frontend/Dockerfile
# ---------------------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]

# ---------------------------------------------------------------------
# 3.4. frontend/next.config.ts (Configuración para Docker y Tailwind)
# ---------------------------------------------------------------------
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  output: 'standalone', // Requerido para Docker
};

export default nextConfig;

# ---------------------------------------------------------------------
# 3.5. frontend/src/app/globals.css (Configuración de Tailwind v4)
# ---------------------------------------------------------------------
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-bg-light: #f1f5f9;
  --color-bg-dark: #0b1120;
  --color-surface-light: #ffffff;
  --color-surface-dark: #1e293b;
  --color-primary-light: #2563eb;
  --color-primary-dark: #3b82f6;
  --color-accent-light: #ea580c;
  --color-accent-dark: #f97316;
}

body {
  background-color: var(--color-bg-light);
  color: #1e293b;
}

.dark body {
  background-color: var(--color-bg-dark);
  color: #e2e8f0;
}
# =====================================================================
# FIN DEL DOCUMENTO
# =====================================================================