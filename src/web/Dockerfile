FROM node:20-bullseye as build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build --configuration production

FROM nginx:latest
COPY --from=build /usr/local/src/app/dist /usr/share/nginx/html
EXPOSE 80