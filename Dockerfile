# https://github.com/prisma/prisma-examples/tree/prisma2/deployment-platforms/docker

FROM node:15.12.0
ENV NODE_ENV=production

WORKDIR /app
COPY . ./

USER root

RUN npm install && npm run build
RUN chown -R node /app

EXPOSE 8080

USER node
CMD ["npm", "start"]
