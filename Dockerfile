FROM node:20
WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start:prod"]