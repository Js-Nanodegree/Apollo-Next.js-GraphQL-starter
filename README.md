## Features

- [x] Server Side Rendering (SSR)
- [x] GraphQL queries, mutations & subscripions
- [x] MongoDB Database
- [x] GraphQL Playground
- [x] Ready for deployment
- [x] Hot Reloading thanks to Next.js
- [x] CSS in JSX
- [x] user registration and email verification
- [ ] Nginx deployment configuration

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

### Registration workflow

1. User enters their email address on /register
2. A subscription object is created that has a token
3. An email is sent to the email address with a verification link
4. The user clicks the verification link
5. The user can then complete their profile and password
