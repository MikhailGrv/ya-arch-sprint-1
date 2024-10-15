
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/users',
    createProxyMiddleware({
      target: 'http://localhost:8091',
      changeOrigin: true,
      logProvider: function logProvider(provider) {
        // replace the default console log provider.
        return null;
      },
    })
  );
};