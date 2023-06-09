
#FROM node:14-alpine as build
FROM node:14.20.1-alpine as build
WORKDIR /app
#RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
#RUN npm cache clean --force
#RUN npm i -g @angular/cli
#RUN npm install
RUN npm ci --no-audit
#RUN npm i -g @angular/cli@14.1.3
#RUN ngcc
COPY . .
#RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --prod
#RUN ng build --prod
#CMD RUN npm run build:prod
RUN npm run build
#stage 2
#FROM nginx:alpine
FROM nginx:latest AS ngi
COPY --from=build /app/dist/payrollCO /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80   




# FROM node:lts-alpine as nodeinstall 
# ARG srcPath
# ARG containerPath
# ARG npmCache
# ARG homePath
# ENV TERM xterm-256color

# RUN apk update && apk add --no-cache tini
# WORKDIR ${containerPath}
# COPY ${srcPath}/package*.json ./
# RUN mkdir -p node_modules && chown -R node:node ${containerPath}
# USER node
# RUN npm set unsafe-perm true
# RUN npm config set cache ${npmCache}
# RUN /sbin/tini -g -- npm install
# RUN /sbin/tini -g -- npx ngcc --properties es2015 browser module main --create-ivy-entry-points
# COPY --chown=node:node ${srcPath} .


# FROM node:12.6-stretch

# ARG ABSOLUTE_PATH=./app
# ARG build_command="node --max_old_space_size=5120 node_modules/@angular/cli/bin/ng build"
# COPY $ABSOLUTE_PATH/package.json /app/package.json
# COPY $ABSOLUTE_PATH/.npmrc /app/.npmrc

# WORKDIR /app

# RUN npm i
# RUN node node_modules/@angular/cli/bin/ng version
# COPY $ABSOLUTE_PATH/. ./
# RUN npm run build-dependency
# RUN npm run ${build_command}