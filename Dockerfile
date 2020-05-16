# https://github.com/prisma/prisma-examples/tree/prisma2/deployment-platforms/docker

FROM node:14.2
ENV NODE_ENV=production

WORKDIR /app
COPY . ./

USER root

RUN npm install && npm run build
RUN chown -R node /app

USER node
CMD ["npm", "start"]
