FROM node:8-alpine

ENV APP_DIR /app
RUN mkdir ${APP_DIR}
WORKDIR ${APP_DIR}
ADD . ${APP_DIR}
RUN npm install
CMD ["./bin/deelay.js"]
