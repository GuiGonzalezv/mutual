# Mutual API

A simple API simulating a bank account system

## :rocket: Tools
The technologies listed below were used in the project
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/pt-br/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/)
- [Jest](https://jestjs.io/pt-BR/)
- [Swagger](https://swagger.io/)


## :information_source: Important info
- By default our app runs on localhost on port 3000 (can be changed in .env file)
- To access our api structure you can use the route below
- - [Swagger (App must be running)](https://localhost:3000/swagger)
- If you want to use postman, have a exported collection in the project root ('postman.json')

## :information_source: Clone Instructions
### API Configuration (running in dev mode)
```git
$ git clone https://github.com/GuiGonzalezv/mutual.git

$ make up-dev
```

### API Configuration (running in prod mode)
```git
$ git clone https://github.com/GuiGonzalezv/mutual.git

$ make up
```

## :test_tube: Tests
### Running tests
```git
// To run the test we need the api running in dev mode
$ make test
```

- Made by Guilherme Gonzalez Vieira
