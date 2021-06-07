FROM node:16.3.0-alpine

LABEL maintainer="arthur.fiorette@gmail.com"

WORKDIR /usr/app

COPY . .

RUN yarn && yarn cache clean
RUN yarn run build

ENV NODE_ENV=production

EXPOSE 1228

CMD ["yarn", "start"]