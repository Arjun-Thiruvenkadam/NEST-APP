# Bus API

## Description

  This document describes the API for an online bus ticket booking application.

## Stack

- NodeJS
- NestJS
- MongoDB

## Environment Variables Used

- [DB_URL] - MongoDb URL hosted on Atlas 
- [ADMIN_KEY] - Admin key for accessing reset option in API

## Endpoints

|HTTP Method |Entity   |Endpoint   |Input   |Result Object   |   |
|---|---|---|---|---|---|
|Put   |/tickets|/update   |   |   |   |
|Put   ||/reset   |   |   |   |
|Put   ||/:id   |   |   |   |
|Get   ||/   |   |   |   |
|Get   ||/:id   |   |   |   |
|Get   ||/status/:stat   |   |   |   |

## Installation

```bash
# Install
$ git clone https://gitlab.com/arjunthiru/nestjs-api.git

$ cd <PROJECT_NAME>

$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
