// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// create the proxy
/** @type {import('http-proxy-middleware/dist/types').RequestHandler<express.Request, express.Response>} */
const beUsersProxy = createProxyMiddleware({
  target: 'http://localhost:8091', // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log('req',proxyReq.originalUrl );
      console.log('req',req.originalUrl );
    },
    },
});
const beCardsProxy = createProxyMiddleware({
    target: 'http://localhost:8092', // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
});
const feProxy = createProxyMiddleware({
    target: 'http://localhost:8081', // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
});

// mount `exampleProxy` in web server
app.use('/api/users', beUsersProxy);
app.use('/api/cards', beCardsProxy);
app.use('/', feProxy);
app.listen(3000);