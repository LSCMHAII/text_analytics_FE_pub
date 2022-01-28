const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/test',
        createProxyMiddleware({
            target: 'http://text-flask:5000',
            changeOrigin: true,
        })
    );

    app.use(
        '/database/conceptnet',
        createProxyMiddleware({
            target: 'http://text-flask:5000',
            changeOrigin: true,
        })
    );


};
