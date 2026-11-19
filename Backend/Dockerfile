# Usa una imagen oficial y ligera de Python
FROM python:3.11-slim

# Directorio de trabajo
WORKDIR /app

# Copia e instala dependencias primero (para aprovechar la caché de Docker)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código
COPY . .

# Expone el puerto de FastAPI
EXPOSE 8000

# Comando para iniciar el servidor (escucha en todas las interfaces)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]