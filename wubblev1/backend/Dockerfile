# ARG <name>[=<default value>]
# E.G.
# ARG SETTINGS
# RUN ./run/init-stuff $SETTINGS

ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine AS build
# RUN apk update && apk add python make g++ && rm -rf /var/cache/apk/*
WORKDIR /app

COPY @es-labs/node/package*.json ./@es-labs/node/
RUN cd @es-labs/node && npm i --only=production

COPY package*.json ./
# RUN npm ci --only=production ../../@es-labs causes problems
# RUN npm i @es-labs/esm@latest @es-labs/node@latest
RUN npm i --only=production
COPY . .

# FROM gcr.io/distroless/nodejs:debug
# eventually it should be master...
FROM gcr.io/distroless/nodejs:${NODE_VERSION} AS production
WORKDIR /app
COPY --from=build /app .

ARG ARG_API_PORT=3000
ARG ARG_NODE_ENV=main
ARG ARG_VAULT=
EXPOSE $ARG_API_PORT
EXPOSE 3001
ENV API_PORT $ARG_API_PORT
ENV NODE_ENV $ARG_NODE_ENV
ENV VAULT $ARG_VAULT
ENV PORT $ARG_API_PORT
CMD ["index.js"]
