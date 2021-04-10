FROM node:14.16-alpine

LABEL maintainer="arthur.fiorette@gmail.com"
LABEL version="1.3.0"

WORKDIR /usr/app

COPY . .

RUN yarn && yarn cache clean
RUN yarn run build

ENV NODE_ENV=production

EXPOSE 1228

CMD ["yarn", "start"]