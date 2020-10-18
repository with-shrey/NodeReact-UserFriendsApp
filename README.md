# Node-React User-Friends App

## Setting Up Project 
- Install Docker & Docker-Compose 
- In the project root run the following commands in given order
```bash
docker-compose run backend npm install
docker-compose run client npm install
docker-compose up -d                       <- Starts all services
docker-compose run backend npm run migrate <- Migrates Database
docker-compose run backend npm run seed    <- Adds Fake Data to database
```
- To Stop Application
```bash
docker-compose down
```
- To Stop and delete database
```bash
docker-compose down -v
```
- Access Front End At `localhost:3000`
- Access Backend End At `localhost:3001`

## DB Administration
- visit `localhost:8080` for accessing database
```
    "username": "user",
    "password": "password",
    "database": "app",
    "host": "db",
```

## Backend - NodeJS
- `sequelize` with MySQL
- `http-errors` & `http-status` for Error Passing from routes
- `celebrate` for query, params and body validation
- `dotenv` for environment management 



# Folder Structure
- `index.js` - Entry file - File with minimum required lines of code
- `config` - Contains all configuration variables
- `loaders` - Contains all application boot code, it includes loading libs, connecting to db etc.
- `middlewares` - All Express custom middlewares
- `migrations` - Sequelize DB migrations - Created by lib
- `models` - Contains All Models - Models should be slim with just validation and relations - this is the Repository layer
- `api` - A Mixture of routes & Controllers - is not aware of DB or ORM layer
- `seeders` - To Add some default data to database for testing
- `services` - Core of application contains all business logic - Services interacct with ORM and contain all the logic but no HTTP related code
- `utilities` - Contains reusable functions 1 function per file
- `test` - Jest & Mocha Tests
- `client` - React.JS App

# Plan of Adding Test Cases
- Following Test Driven Development
    - Write unit tests prior to making code changes
    - Check that the tests are failing initially
    - Make Changes in code so that all test cases pass
- For Node.JS
    - Mocha & Chai for Unit And Integration Tests
    - Unit Testing will be done by mocking Sequalize
    - Integration tests are performed by calling api endpoint and testing output
- For React
    - Jest & Enzyme will be used as testing framework
    - Unit testing using jest & enzyme shallow rendering
    - Integration testing using enzyme's mount function
    - E2E Testing using Cypress 

# Testing using postman
- Postman collection is included at the root of repository [PostManCollection.json](PostManCollection.json)
- It contains all the api and examples




