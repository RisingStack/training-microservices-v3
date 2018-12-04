FROM node:lts-alpine AS build

RUN apk add build-base python

COPY package.json package.json

RUN npm install

FROM node:lts-alpine

COPY index.js index.js
COPY --from=build node_modules node_modules

CMD ["node", "."]
