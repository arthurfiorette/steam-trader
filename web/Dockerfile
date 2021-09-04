FROM node:15.14.0-alpine

LABEL maintainer="arthurfiorette <arthur.fiorette@gmail.com>"

WORKDIR /usr/local/steam-trader/web

COPY package.json .
COPY yarn.lock .

RUN yarn && yarn cache clean

COPY . .

RUN yarn build

ENV NODE_ENV=production

EXPOSE 1227

CMD ["yarn", "start"]