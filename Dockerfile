FROM node:16-alpine3.12
WORKDIR /app
COPY . .
RUN yarn install
RUN npm install -g ts-node typescript