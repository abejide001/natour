# Natours

Natour is a web application that allows tourist to book tours

## Introduction

Welcome to version 1 of Natour API. Below you will find a current list of available methods on different endpoints.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

To work with this project you need to have the following installed on your local machine

1. [NodeJS](https://nodejs.org)
2. [Git](https://git-scm.com/downloads)
3. [Postman](https://www.postman.com/)
4. [Redis](redis.io)
5. [MongoDB](mongodb.com)

## Install and run locally

```bash
$ git clone https://github.com/abejide001/natour.git
$ cd natour
# rename .env.sample to .env, and set your environment variables

$ npm i
$ npm run seed
$ npm run start:dev

## API Usage

API BASE URL http://booktours.herokuapp.com/api/v1. It's recommended to attach a `authorization` Header containing the generated `token` from `/api/auth/signin` to all access all requests.

### Tours endpoints `/api/v1/tours`

| method | route                                              | description                              |
| ------ | -------------------------------------------------- | -----------------------------------------|
| GET    | /                                                  | Get all tours                            |
| GET    | /:tourId                                           | Get a tour                               |
| POST   | /                                                  | Create a tour                            |
| PATCH  | /:tourId                                           | Update a tour                            |
| DELETE | /:tourId                                           | Delete a tour                            |  
| GET    | /top                                               | Get top tours                            |
| GET    | /tour-stats                                        | Get tour stats                           |
| GET    | /monthly-plan/:year                                | Get monthly tours                        |
| GET    | /archives                                          | Get archives                             |
| DELETE | /unarchive/:tourId                                 | Unarchive a tour                         |
| DELETE | /archives/:tourId                                  | archive a tour                           |
| GET    | /:tourId/reviews                                   | Get all reviews belonging to a tour      |
| GET    | /tours-within/:distance/center/:latlng/unit/:unit  | Get tours within                         |
| GET    | /distances/:latlng/unit/:unit                      | Get distances                            |
| POST   | /:tourId/reviews                                   | Create review for tour                   |

### User endpoints `/api/v1/users`
| method | route                                              | description                              |
| ------ | -------------------------------------------------- | -----------------------------------------|
| GET    | /                                                  | Get all users                            |
| GET    | /me                                                | Get a single user                        |
| PATCH  | /updateme                                          | Update a user                            |
| DELETE | /delete-me                                         | Delete a user                            |