
FROM node:10

WORKDIR /usr/src/app/ridescheduler

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]