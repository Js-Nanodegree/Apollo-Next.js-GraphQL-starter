import loggaroo from 'loggaroo'
import 'babel-core/register'
import express from 'express'
import passport from 'passport'
import logger from 'morgan'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import winston from 'winston'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import { ENV, IS_DEBUG } from './config/env'
import { port } from './config/settings'
import connect from './init/connect'
import ApolloServer from './graphql'
import deserialiseUser from './middleware/deserialiseUser'

const app = express()

app.use(logger(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',

  ].join(' ')
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride())
app.use(cookieParser())

const debug = require('debug')('apily:server')
const http = require('http')

app.set('port', port)

const server = http.createServer(app)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'authorisation,Content-Type')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  return next()
})

function onListening () {
  const addr = server.address()
  winston.info('Server running on port ' + addr.port + ' in ' + ENV + ' mode.')
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}

/* ===============================================
Event listener for HTTP server "error" event.
=============================================== */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      loggaroo.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      loggaroo.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

app.use(passport.initialize())

connect()

// attaches the user to Express's req object
// Available at req.user
// Inside a graphql function, the user will be available at context.req.user
app.use(deserialiseUser)

ApolloServer.applyMiddleware({app})

// app.use('/graphql', graphqlExpress((req, res) => {
//     return {
//         schema,
//         context: {req, res}
//     }
// }));
//
// // GraphiQL, a visual editor for queries
// if (IS_DEBUG) {
//     app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
// }

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
