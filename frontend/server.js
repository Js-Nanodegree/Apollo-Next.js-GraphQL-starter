const express = require('express');
const next = require('next');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = 3000;
const proxy = require('express-http-proxy');
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  // Catch all requests to the graphql server and pass them on
  server.use(
    '/graphql',
    // Proxy the server's requests to the graphql app
    proxy('http://localhost:8080', {
      proxyReqPathResolver: function(req) {
        return require('url').parse('/graphql' + req.url).path;
      }
      //  preserveHostHdr: true
    })
  );

  server.use(helmet());

  // Allow access to resources in the static folder
  server.use('/static', express.static('static'));

  server.get('/', (req, res) => {
    return app.render(req, res, '/index');
  });

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login');
  });

  server.get('/settings', (req, res) => {
    return app.render(req, res, '/settings');
  });

  server.get('/invite', (req, res) => {
    return app.render(req, res, '/invite');
  });

  server.get('/register/:id/:token', (req, res) => {
    return app.render(req, res, '/register', {
      _id: req.params.id,
      token: req.params.token
    });
  });

  server.get('/register', (req, res) => {
    return app.render(req, res, '/register');
  });

  server.get('/SAMPLE_RESOURCE/:permalink', (req, res) => {
    // Event index page
    return app.render(req, res, '/event', { permalink: req.params.permalink });
  });

  server.get(
    '/SAMPLE_RESOURCE/:permalink/SAMPLE_RESOURCE_SUB_PAGE',
    (req, res) => {
      // Event agenda page
      return app.render(req, res, '/SAMPLE_RESOURCE/SAMPLE_RESOURCE_SUB_PAGE', {
        permalink: req.params.permalink
      });
    }
  );

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(
      `Client ready at http://localhost:${port} in ${
        dev ? 'development' : 'production'
      } mode`
    );
  });
});
