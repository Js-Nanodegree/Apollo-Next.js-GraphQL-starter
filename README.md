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

## Development:

#### Server

cd the the root of the project and use the following commands.

Run the development server with:

`npm run dev:server`

#### Client

Run the development client with:

`npm run dev:client`

## Production:

To deploy your application, cd to the root of your application and run

`npm run deploy`

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
