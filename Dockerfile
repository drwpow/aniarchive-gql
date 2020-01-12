FROM node:13-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/package.json
RUN npm install

ADD . /usr/src/app
RUN NODE_ENV=production npm run build

FROM node:13-alpine

ENV PORT=4000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --chown=7171:8787 --from=builder /usr/src/app /usr/src/app/

USER 7171:8787

EXPOSE $PORT
CMD ["npm", "run", "start"]
