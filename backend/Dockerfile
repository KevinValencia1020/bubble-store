# --- Etapa Base: Instalar pnpm globalmente ---
FROM node:20-alpine AS pnpm_installer
RUN npm install -g pnpm

# --- Etapa de Dependencias: Instalar dependencias del backend ---
FROM pnpm_installer AS deps
WORKDIR /app
# Copia archivos esenciales del backend
COPY backend/package.json ./package.json
COPY backend/pnpm-lock.yaml ./pnpm-lock.yaml

# Instala todas las dependencias del backend.
RUN pnpm install --frozen-lockfile

# --- Etapa Final (Runner): Servir la aplicación backend ---
FROM deps AS runner
WORKDIR /app
# Copia el código fuente del backend
COPY backend/ ./

# Copia archivos de entorno si son necesarios dentro del contenedor
# COPY backend/.env ./backend/.env

# Exponer el puerto por el que el backend escuchará
EXPOSE 3001

# Comando para iniciar el servidor de desarrollo del backend (con nodemon)
CMD ["pnpm", "run", "dev"]
# Para producción (sin nodemon):
# CMD ["pnpm", "start"]
