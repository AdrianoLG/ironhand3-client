FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Rutas relativas: nginx las reenvía al back por la red de Docker
ARG VITE_GRAPHQL_URI=/graphql
ARG VITE_UPLOAD_URI=/upload
ARG VITE_UPLOAD_IMAGES_PATH=/uploads
ENV VITE_GRAPHQL_URI=$VITE_GRAPHQL_URI \
    VITE_UPLOAD_URI=$VITE_UPLOAD_URI \
    VITE_UPLOAD_IMAGES_PATH=$VITE_UPLOAD_IMAGES_PATH
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# El código referencia imágenes como ./src/assets/img/... en tiempo de ejecución
COPY --from=build /app/src/assets /usr/share/nginx/html/src/assets
EXPOSE 80
