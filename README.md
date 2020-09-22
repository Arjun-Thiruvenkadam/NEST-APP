# Bus API

## Description

  This document describes the API for an online bus ticket booking application.

## Stack

- NodeJS
- NestJS
- MongoDB

## Environment Variables Used

- [DB_URL] - MongoDb URL hosted on Atlas

## Demo

  Visit https://nestjs-bus-api.herokuapp.com/api for a live demo of the API.

## Endpoints

|HTTP Method |Entity   |Endpoint   |Input   |Result Object   |
|---|---|---|---|---|
|Put   |/tickets|/update   |Body:<br>[<br>{<br> ticketId : integer ,<br> personId : string <br>},<br>{...},<br>..<br>]   |[<br>{<br> ticketId : integer ,<br> result : string<br> },<br>{...},<br>..<br>]   |
|Put   ||/reset   |Body:<br>{<br>userId : string <br>}   |result : string   |
|Put   ||/:id   |Param:<br>{ <br>userId : string<br> }   |result : string   |
|Get   ||/   |   |<br>[<br>{<br> ticketId : integer ,<br> status : string ,<br> personId : string <br>},<br>{...},<br>..<br>]   |
|Get   ||/:id   |   |{<br>ticketId : integer ,<br> status : string ,<br> personId : string<br>}   |
|Get   ||/status/:stat   |   |<br>[<br>{<br> ticketId : integer ,<br> status : string ,<br> personId : string <br>},<br>{...},<br>..<br>]   |
|Post   |/auth|/signup|Body:<br>{<br> userName : string ,<br> mail : string ,<br> password : string <br>}| {<br>name : string ,<br> token : string <br>}|
|Post   ||/login|Body:<br>{<br> email : string ,<br> password : string <br>}|{<br>name : string ,<br> token : string <br>}|
|Get   |/users|/:userId|   |{<br> userName : string ,<br> mail : string ,<br> _id : string <br>}  |

## Installation

```bash
# Install
$ git clone https://github.com/Arjun-Thiruvenkadam/NEST-APP.git

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

```
