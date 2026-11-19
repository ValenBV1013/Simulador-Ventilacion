# 🌡️ TermoVent — Simulador Termodinámico de Ventilación

Plataforma web interactiva diseñada para verificar si un recinto (cocina, baño, habitación) cumple con las medidas de ventilación y seguridad necesarias para la instalación de estufas, calentadores o chimeneas.

Desarrollado por **aprendices de ADSO (Análisis y Desarrollo de Software) del SENA** para la clase de Física, aplicando conceptos de termodinámica y mecánica de fluidos (volumen mínimo de aire y área de rejillas) para prevenir intoxicaciones por Monóxido de Carbono (CO).

---

## ✨ Características

- **Simulador Termodinámico:** Calcula volumen y área de ventilación según la norma **NTC 3631**.
- **Interfaz Interactiva:** Animaciones fluidas con Framer Motion y visualización dinámica del recinto.
- **Recomendaciones:** Tarjetas con soluciones ordenadas por viabilidad (**Económica**, **Balanceada**, **Premium**).
- **Diseño Moderno:** Estilos con *glassmorphism*, soporte para modo oscuro/claro y diseño 100% *responsive*.
- **Dockerizado:** Configurado para ejecutarse de forma consistente en distintos entornos.

---

## 🛠️ Tecnologías

- **Frontend:** Next.js 16 (con `next/font` y `create-next-app`), React, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, Axios.
- **Backend:** Python 3.11, FastAPI, Uvicorn, Pydantic.
- **DevOps y Despliegue:** Docker, Docker Compose, Vercel (Frontend), Render (Backend).

---

## 🔗 Enlaces del Proyecto

- 🌐 **Live Demo (Frontend):** [https://simulador-ventilacion.vercel.app/](https://simulador-ventilacion.vercel.app/)
- 💻 **Repositorio GitHub:** [https://github.com/ValenBV1013/Simulador-Ventilacion](https://github.com/ValenBV1013/Simulador-Ventilacion)
- ⚙️ **Documentación de la API (Backend):** [https://simulador-ventilacion-backend.onrender.com/docs](https://simulador-ventilacion-backend.onrender.com/docs)

---

## 🚀 Primeros Pasos (Ejecución Local)

### 1. Clonar el repositorio

    git clone https://github.com/ValenBV1013/Simulador-Ventilacion.git
    cd Simulador-Ventilacion

### 2. Ejecutar con Docker (Recomendado)

    docker-compose up --build

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend (API Docs):** [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Ejecutar manualmente (sin Docker)

#### Backend (FastAPI)

    cd backend
    python -m venv venv
    # Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
    pip install -r requirements.txt
    uvicorn main:app --reload

#### Frontend (Next.js)

    cd frontend
    npm install
    npm run dev

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento. Puedes editar la página principal modificando `src/app/page.tsx` (los cambios se reflejan automáticamente en desarrollo).

---

## ☁️ Despliegue en Vercel

La forma más sencilla de desplegar el *frontend* de Next.js es mediante la [Plataforma de Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), conectando la rama principal (`main`) del repositorio.

Revisa la [documentación oficial de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

---

## 📚 Recursos y Documentación

- [Documentación de Next.js](https://nextjs.org/docs) — Características del framework y API.
- [Aprende Next.js](https://nextjs.org/learn) — Tutorial interactivo paso a paso.
- [Repositorio de Next.js en GitHub](https://github.com/vercel/next.js) — Código fuente y comunidad.
