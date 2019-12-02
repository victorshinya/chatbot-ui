FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn install --ignore-engines
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
