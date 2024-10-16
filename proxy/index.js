// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const { PORT = 3000 } = process.env;
// create the proxy
/** @type {import('http-proxy-middleware/dist/types').RequestHandler<express.Request, express.Response>} */
const beAuthProxy = createProxyMiddleware({
    target: 'http://localhost:8090', // target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
   // pathRewrite: {'^/' : '/users/'},
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log('beUAuthProxy req',proxyReq.originalUrl );
        console.log(' eUAuthProxy req',req.originalUrl );
      },
      },
  });
const beUsersProxy = createProxyMiddleware({
  target: 'http://localhost:8091', // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
 // pathRewrite: {'^/' : '/users/'},
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log('beUsersProxy req',proxyReq.originalUrl );
      console.log('beUsersProxy req',req.originalUrl );
    },
    },
});
const beCardsProxy = createProxyMiddleware({
    target: 'http://localhost:8092', // target host with the same base path
   // pathRewrite: {'^/' : '/cards/'},
    changeOrigin: true, // needed for virtual hosted sites
});

const feProxy = createProxyMiddleware({
    target: 'http://localhost:8081', // target host with the same base path
    
    changeOrigin: true, // needed for virtual hosted sites
});
const feMFProxy = createProxyMiddleware({
  target: 'http://localhost:8095', // target host with the same base path
  
  changeOrigin: true, // needed for virtual hosted sites
});
const feMF_usersProxy = createProxyMiddleware({
  target: 'http://localhost:8096', // target host with the same base path
  
  changeOrigin: true, // needed for virtual hosted sites
});


// mount `exampleProxy` in web server
app.use('/api/users', beUsersProxy);
app.use('/api/cards', beCardsProxy);
app.use('/api/auth', beAuthProxy);
app.use('/fe-users', feMF_usersProxy);
app.use('/', feMFProxy);

app.listen(PORT, () => console.log(`Proxy API server started at port ${PORT}`));