FROM node:20-bullseye as build
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/src/app/dist/sample-angular-app /usr/share/nginx/html
EXPOSE 80