# https://github.com/prisma/prisma-examples/tree/prisma2/deployment-platforms/docker

FROM node:13.13
RUN openssl version -v
RUN uname -a
ENV NODE_ENV $NODE_ENV
ENV POSTGRESQL_URL $POSTGRESQL_URL

WORKDIR /app
COPY . ./

USER root

RUN npm install && chown -R node /app

RUN npm run build

USER node

CMD npm start
