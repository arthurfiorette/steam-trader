FROM node:16.10.0-alpine

LABEL maintainer="arthurfiorette <arthur.fiorette@gmail.com>"

WORKDIR /usr/local/steam-trader/app

COPY package.json .
COPY yarn.lock .

RUN yarn && yarn cache clean

COPY . .

RUN yarn build

ENV NODE_ENV=production

EXPOSE 1228

CMD ["yarn", "start"]
