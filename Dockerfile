# https://github.com/prisma/prisma-examples/tree/prisma2/deployment-platforms/docker

FROM node:13.13
ARG env
ARG pg
ENV NODE_ENV=${env}
ENV POSTGRESQL_URL=${pg}

WORKDIR /app
COPY . ./

USER root

RUN npm install && chown -R node /app

RUN npm run build

USER node

CMD npm start
