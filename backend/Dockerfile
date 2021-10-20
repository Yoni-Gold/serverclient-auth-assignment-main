FROM node:12

USER root

WORKDIR /app/server

COPY ./package.json .
COPY ./tsconfig.json .

RUN npm i -g ts-node

RUN npm i

COPY . .

EXPOSE 3001

CMD ["ts-node" , "index.ts"]