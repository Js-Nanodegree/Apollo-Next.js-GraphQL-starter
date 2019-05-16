# Apollo GraphQL starter pack

[![GitHub license](https://img.shields.io/github/license/tomanagle/Apollo-Next.js-GraphQL-starter.svg)](https://github.com/tomanagle/Apollo-Next.js-GraphQL-starter/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/tomanagle/Apollo-Next.js-GraphQL-starter.svg)](https://github.com/tomanagle/Apollo-Next.js-GraphQL-starter/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/tomanagle/Apollo-Next.js-GraphQL-starter.svg)](https://github.com/tomanagle/Apollo-Next.js-GraphQL-starter/network)

## Features

- [x] Server Side Rendering (SSR)
- [x] GraphQL queries, mutations & subscripions
- [x] MongoDB Database
- [x] GraphQL Playground
- [x] Ready for deployment
- [x] Hot Reloading thanks to Next.js
- [x] CSS in JSX
- [x] User registration and email verification
- [x] TypeScript support
- [ ] Nginx deployment configuration

## Getting started

1. Clone this repository https://github.com/tomanagle/Apollo-Next.js-GraphQL-starter.git
2. Copy /server/.env.development to /server/.env
3. Sign up to MailGun and add your API details to the .env file
4. Run yarn install in /frontend and in /server

### Running tests

`yarn test` runs the server and client test commands.

### Running the development server

`dev:server` runs the server in development mode and `dev:frontend` runs the front end in development mode.

### Deploying the application

Install PM2 with ``yarn add pm2 --global``

Both the client and server application have build commands that transpile the TypeScript and ES6 into usable JavaScript. `yarn deploy` will build the server and front end applications, along with starting them with PM2.

## Contributing

Contributions in the form of PRs or issues are welcomed!

## Stack

- MongoDB - Database
- Mongoose - Database ORM
- Express - Lightweight HTTP server
- Apollo server - GraphQL tools
- Next.js

## Registration workflow

1. User enters their email address on /register
2. An invite object is created that has a token
3. An email is sent to the email address with a verification link
4. The user clicks the verification link
5. The user can then complete their profile and password
