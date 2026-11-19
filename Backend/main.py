from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="API Simulador de Ventilación")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://simulador-ventilacion.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class DatosRecinto(BaseModel):
    ancho: float
    largo: float
    alto: float
    potencia_kw: float
    tiene_rejillas: bool
    area_rejillas_cm2: float
    tiene_evacuacion: bool

@app.post("/api/verificar")
def verificar_recinto(datos: DatosRecinto):
    volumen_m3 = datos.ancho * datos.largo * datos.alto
    volumen_requerido_m3 = datos.potencia_kw * 4.8
    es_confinado = volumen_m3 < volumen_requerido_m3
    
    mensajes = []
    alertas = []
    recomendaciones = []
    cumple = True

    if es_confinado:
        alertas.append(f"Recinto CONFINADO. Volumen actual: {volumen_m3:.2f} m³. Mínimo requerido: {volumen_requerido_m3:.2f} m³ (4.8 m³/kW).")
    else:
        mensajes.append(f"Volumen suficiente: {volumen_m3:.2f} m³.")

    area_requerida_cm2 = 0
    if es_confinado:
        area_requerida_cm2 = datos.potencia_kw * 6
        
        if not datos.tiene_rejillas:
            cumple = False
            alertas.append("Faltan rejillas de ventilación obligatorias.")
            recomendaciones.extend([
                {"id": "r1", "titulo": "Rejilla de Pared Básica", "tipo": "economica", "precio": "$50.000 - $80.000 COP", "desc": "Instalar rejilla metálica directa al exterior. Solución rápida y cumple la norma mínima.", "ranking": 1},
                {"id": "r2", "titulo": "Rejilla con Filtro y Regulador", "tipo": "balanceada", "precio": "$120.000 - $180.000 COP", "desc": "Doble persiana que evita insectos y permite regular el flujo de aire.", "ranking": 2},
                {"id": "r3", "titulo": "Ventilación Cruzada Inteligente", "tipo": "premium", "precio": "$450.000 - $700.000 COP", "desc": "Extracción mecánica automatizada con sensores de CO2 y filtros HEPA.", "ranking": 3}
            ])
        elif datos.area_rejillas_cm2 < area_requerida_cm2:
            cumple = False
            alertas.append(f"Área de rejillas insuficiente ({datos.area_rejillas_cm2} cm²). Requiere {area_requerida_cm2:.1f} cm².")
            recomendaciones.extend([
                {"id": "r4", "titulo": "Ampliar Agujero Exterior", "tipo": "economica", "precio": "$30.000 - $50.000 COP", "desc": "Agrandar el orificio de la rejilla actual para alcanzar el área mínima.", "ranking": 1},
                {"id": "r5", "titulo": "Instalar Segunda Rejilla", "tipo": "balanceada", "precio": "$100.000 - $150.000 COP", "desc": "Mantener la actual y añadir otra en la pared opuesta para flujo cruzado.", "ranking": 2}
            ])
        else:
            mensajes.append(f"Área de ventilación adecuada ({datos.area_rejillas_cm2} cm²).")

    if not datos.tiene_evacuacion:
        alertas.append("No hay ducto de evacuación. Riesgo de acumulación de gases tóxicos (CO).")
        recomendaciones.extend([
            {"id": "e1", "titulo": "Extractor de Pared Básico", "tipo": "economica", "precio": "$150.000 - $200.000 COP", "desc": "Instalar un extractor de aire que expulse los humos hacia el exterior.", "ranking": 1},
            {"id": "e2", "titulo": "Campana Extractora de Acero", "tipo": "balanceada", "precio": "$350.000 - $500.000 COP", "desc": "Campana de 60cm con filtros de carbón y luces LED. Eficiencia garantizada.", "ranking": 2},
            {"id": "e3", "titulo": "Ducto de Acero Inoxidable", "tipo": "premium", "precio": "$800.000 - $1.200.000 COP", "desc": "Sistema de extracción de alta gama, silencioso y con acabados de lujo.", "ranking": 3}
        ])
    else:
        mensajes.append("Sistema de evacuación presente.")

    # Ordenar recomendaciones por ranking (de mejor a peor opción)
    recomendaciones.sort(key=lambda x: x["ranking"])

    return {
        "cumple": cumple,
        "volumen_m3": round(volumen_m3, 2),
        "volumen_requerido_m3": round(volumen_requerido_m3, 2),
        "es_confinado": es_confinado,
        "area_requerida_cm2": area_requerida_cm2,
        "mensajes": mensajes,
        "alertas": alertas,
        "recomendaciones": recomendaciones
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)