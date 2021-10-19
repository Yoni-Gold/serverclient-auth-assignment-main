FROM node:12

WORKDIR /app/server

COPY ./package.json .

RUN npm i

COPY . .

EXPOSE 3001

CMD ["ts-node" , "index.ts"]