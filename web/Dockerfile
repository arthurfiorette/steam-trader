FROM node:14.16-alpine

WORKDIR /usr/web

COPY . .

RUN npm install
RUN npm run build
RUN npm run build:server

ENV NODE_ENV=production

EXPOSE 1227

CMD ["npm", "run", "start"]