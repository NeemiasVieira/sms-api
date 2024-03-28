FROM node:20
WORKDIR /app
COPY . /app

RUN npm install

EXPOSE 3333

CMD ["npm", "run", "start"]