# Etapa 1: Compilación de la aplicación Angular
FROM node:18-alpine as build-stage  
# Usa una imagen ligera de Node.js 18 para compilar

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias del proyecto Angular
RUN npm install

# Copia todo el código fuente del proyecto Angular al contenedor
COPY . .

# Ejecuta el build de Angular en modo producción, especificando el proyecto (en caso de workspace)
RUN npm run build --configuration=production --project=front-end-tesis

# ---------------------------------------------------------

# Etapa 2: Servir el sitio Angular con NGINX
FROM nginx:alpine  
# Usa una imagen ligera de NGINX para servir archivos estáticos

# Copia un archivo de configuración personalizado para NGINX
COPY default.conf /etc/nginx/conf.d/default.conf

# Copia el resultado del build de Angular (carpeta "dist") a la carpeta pública de NGINX
COPY --from=build-stage /app/dist/front-end-tesis/browser /usr/share/nginx/html

# Comando por defecto: ejecuta NGINX en primer plano (sin modo demonio)
CMD ["nginx", "-g", "daemon off;"]

