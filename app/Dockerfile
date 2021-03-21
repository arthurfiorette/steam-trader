FROM node:14.16-alpine

WORKDIR /usr/app

COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV=production

EXPOSE 1228

CMD ["npm", "run", "start"]