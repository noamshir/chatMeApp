FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update

RUN apk add make gcc g++ python3

RUN npm install

COPY front-end/package*.json front-end/
RUN npm run install-client --omit=dev

COPY back-end/package*.json back-end/
RUN npm run install-server --omit=dev

RUN npm rebuild bcrypt -–build-from-source --prefix back-end/

RUN apk del make gcc g++ python3

COPY front-end/ front-end/
RUN npm run build --prefix front-end/

COPY back-end/ back-end/

ENV NODE_ENV=production

EXPOSE 3030

USER node

CMD [ "npm", "start", "--prefix", "back-end" ]

