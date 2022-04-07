# Development(Build)
FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

# Production
FROM node:16-alpine as production

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn --production=true

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/server.js" ]