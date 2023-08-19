FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

EXPOSE 4200

RUN npm i -g @angular/cli@latest

CMD ["ng", "serve", "--host", "0.0.0.0", "--environment", "production"]
