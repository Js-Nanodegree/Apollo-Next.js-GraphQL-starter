import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import loggaroo from 'loggaroo';
import logger from 'morgan';
import ApolloServer from './graphql';
import { ENV, IS_DEBUG } from './config/env';
import connect from './init/connect';
import deserialiseUser from './middleware/deserialiseUser';
import methodOverride from 'method-override';
import { port } from './config/settings';

const app = express();

const debug = require('debug')('apily:server');

if (IS_DEBUG) {
  /*
   * Logs all requests coming in while in development mode.
   */
  app.use(
    logger(function(tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms'
      ].join(' ');
    })
  );
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());

app.set('port', port);

const server = http.createServer(app);

function onListening() {
  const addr = server.address();
  loggaroo.info(
    `Server running on  http://localhost${port}/graphql in ${ENV} mode.`
  );
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/* ===============================================
Event listener for HTTP server "error" event.
=============================================== */

interface IError extends Error {
  syscall: string;
  code: string;
}

function onError(error: IError) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      loggaroo.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      loggaroo.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//app.use(passport.initialize());

connect();

// attaches the user to Express's req object
// Available at req.user
// Inside a graphql function, the user will be available at context.req.user
app.use(deserialiseUser);

ApolloServer.applyMiddleware({ app });

ApolloServer.installSubscriptionHandlers(server);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
