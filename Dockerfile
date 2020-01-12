FROM alpine:3.11.2

# https://github.com/prisma/prisma2/issues/702#issuecomment-569778198
ENV LANG=C.UTF-8
ENV GLIBC_VERSION 2.30-r0
RUN apk add --update curl && \
  curl -Lo /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
  curl -Lo glibc.apk "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk" && \
  curl -Lo glibc-bin.apk "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk" && \
  apk add glibc-bin.apk glibc.apk && \
  /usr/glibc-compat/sbin/ldconfig /lib /usr/glibc-compat/lib && \
  echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf && \
  apk del curl && \
  rm -rf glibc.apk glibc-bin.apk /var/cache/apk/*
RUN apk add nodejs npm python g++ make && rm -rf /var/cache/apk/*

WORKDIR /app
COPY . ./
RUN NODE_ENV=production npm install --only=production
RUN npm run build
COPY dist ./dist/

CMD npm start
