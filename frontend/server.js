const express = require('express');
const next = require('next');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  /*
   * This is to proxy requests in development so you can use cross-origin features.
   * In production you should proxy requests to the server with your web server configuration.
   * In Nginx you cna do this with the proxy_pass method.
   * https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
   */
  if (dev) {
    // Catch all requests to the graphql server and pass them on
    server.use(
      '/graphql',
      // Proxy the server's requests to the graphql app
      proxy('http://localhost:8080', {
        proxyReqPathResolver(req) {
          // eslint-disable-next-line global-require
          return require('url').parse(`/graphql${req.url}`).path;
        }
      })
    );
  }

  server.use(helmet());

  // Allow access to resources in the static folder
  server.use('/static', express.static('static'));

  server.get('/', (req, res) => app.render(req, res, '/index'));

  server.get('/login', (req, res) => app.render(req, res, '/login'));

  server.get('/settings', (req, res) => app.render(req, res, '/settings'));

  server.get('/invite', (req, res) => app.render(req, res, '/invite'));

  server.get('/register/:id/:token', (req, res) => app.render(req, res, '/register', {
    _id: req.params.id,
    token: req.params.token
  }));

  server.get('/register', (req, res) => app.render(req, res, '/register'));

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log(
      `Client ready at http://localhost:${port} in ${
        dev ? 'development' : 'production'
      } mode`
    );
  });
});
