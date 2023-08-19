FROM node:latest as build
WORKDIR /usr/local/src/app
COPY . .
RUN npm i
RUN npm run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/local/src/app/dist/grid /usr/share/nginx/html
EXPOSE 80