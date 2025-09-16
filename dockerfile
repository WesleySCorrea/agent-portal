FROM node:22-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm i -g @angular/cli@20.2.2

EXPOSE 4200

CMD ["npm", "run", "start"]