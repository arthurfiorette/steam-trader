FROM node:16.1.0-alpine

LABEL maintainer="arthur.fiorette@gmail.com"

WORKDIR /usr/web

COPY . .

RUN yarn && yarn cache clean
RUN yarn run build

ENV NODE_ENV=production

EXPOSE 1227

CMD ["yarn", "start"]