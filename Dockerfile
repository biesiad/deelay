FROM node:8-alpine

ENV APP_DIR /app
RUN mkdir ${APP_DIR}
WORKDIR ${APP_DIR}
ADD . ${APP_DIR}
CMD ["./bin/deelay.js"]
