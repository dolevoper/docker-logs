FROM node:current-slim

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

CMD [ "npm", "start" ]

COPY . .