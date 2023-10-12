FROM node:18-alpine 

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json ./

RUN yarn install && yarn cache clean

COPY . .

EXPOSE 9000