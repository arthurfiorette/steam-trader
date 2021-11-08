# Dockerfile built with the monorepo root path context
# https://github.com/ArthurFiorette/steam-trader/pull/242

FROM node:17.0.1-alpine

LABEL maintainer="arthurfiorette <arthur.fiorette@gmail.com>"

WORKDIR /usr/local/steam-trader/web

COPY ./web/package.json .
COPY yarn.lock .

RUN yarn && yarn cache clean

COPY ./web/ .

RUN yarn build

ENV NODE_ENV=production

EXPOSE 1227

CMD ["yarn", "start"]