# Usa una imagen base de Node.js con Alpine para un tamaño más pequeño
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm

# Copia los archivos del gestor de paquetes primero para aprovechar el caché de capas de Docker.
COPY frontend/package.json ./package.json
COPY frontend/pnpm-lock.yaml ./pnpm-lock.yaml

# Instala TODAS las dependencias (incluidas las de desarrollo)
# El flag --prod se elimina porque `pnpm dev` las necesita.
RUN pnpm install --frozen-lockfile

# Copia el resto del código fuente del frontend.
# Nota: Cuando usas docker-compose, la directiva `volumes` montará tu código local
# sobre esto, permitiendo el hot-reloading.
COPY frontend/ ./

# Exponer el puerto por el que Next.js servirá la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación Next.js
CMD ["pnpm", "run", "dev"]
