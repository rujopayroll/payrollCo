
#FROM node:14-alpine as build
FROM node:14.21.3-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
#RUN npm cache clean --force
#RUN npm i -g @angular/cli
RUN sudo npm install
COPY . .
RUN npm run build --prod
#stage 2
#FROM nginx:alpine
FROM nginx:latest AS ngi
COPY --from=build /app/dist/payrollCO /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80