# Welcome to my jwt-auth project

In this project I recieved a website template and was required to create a server and implement a JWT authentication process.
This project is divided to front end and back end folders that represent the clint side and server side.
The server is built on express and typescript and it communicates with a mongodb database.
The client was created for me and I only implemented the different routes for the user like login, signup, logout and update profile.

## Before Starting

Before you start the project make sure its configured right. First create a .env file in the backend directory that will include all the following variabels:
- MONGO_CLUSTER: this is the cluster you will use in your mongodb database
- MONGO_DBNAME: this will be the database name in the cluster
- MONGO_USERNAME: this is the user name of your data base user in mongo
- MONGO_PASSWORD: this is your personal password for the mongodb account
- SECRET: this is the secret key nececery for the jwt encryption (can be whatever you want)

And one more thing, incase you dont want to run this through docker you will have to go to the package.json in the frontend folder and change the proxy to "http://localhost:3001" instead of "http://server:3001".

## Running the server

- Open the project and navigate to the backend directory and run "npm i"
- Then to start the server run "ts-node index.ts"

## Running the client

- Open the project and navigate to the frontend directory and run "npm i"
- Then to start the client run "npm start"

## Running with docker

- In the project directory run "docker-compose up" (make sure the client's proxy is set to "http://server:3001")
- Once finished go to "http://localhost:3000"
