# #Primera Etapa
# FROM node:14-alpine as build-step

# RUN mkdir -p /app

# WORKDIR /app

# COPY package.json /app

# RUN npm i -g @angular/cli

# RUN npm install 

# COPY . /app

# RUN npm run build --prod

# #Segunda Etapa
# FROM nginx:1.17.1-alpine
# 	#Si estas utilizando otra aplicacion cambia PokeApp por el nombre de tu app
# COPY --from=build-step /app/dist/Payrollco /usr/share/nginx/html

FROM node:14-alpine as node
WORKDIR /app
COPY . .
RUN npm i -g @angular/cli
RUN npm install
RUN npm run build
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/Angular /usr/share/nginx/html
EXPOSE 80