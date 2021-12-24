#FROM node:12
#WORKDIR /usr/src/app
#COPY package*.json ./
#
#RUN npm install
#COPY . .

#CMD [ "node", "server.js" ]

FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install pm2 -g
RUN npm install
COPY . .
EXPOSE 3000
#CMD ["pm2-dev","ecosystem.config.js"]

