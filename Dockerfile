# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# COPY .env .env

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

ENV PORT 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]




# # build stage
# FROM node:18-alpine AS build

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# # prod stage
# FROM node:18-alpine

# WORKDIR /usr/src/app

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# COPY --from=build /usr/src/app/dist ./dist

# COPY package*.json ./

# RUN nmp install --only=production

# RUN rm package*.json

# EXPOSE 3000

# CMD ["node", "dist/main.js"]