const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/deployment',
        createProxyMiddleware({
            // When running locally, you can change this URL to point to your stack
            // This will prevent CORS errors when running locally
            target: process.env.REACT_APP_ENDPOINT,
            changeOrigin: true,
        }),
    );

    app.use(
        '/assets',
        createProxyMiddleware({
            // When running locally, you can change this URL to point to your stack
            // This will prevent CORS errors when running locally
            target: process.env.REACT_APP_ENDPOINT,
            changeOrigin: true,
        }),
    );

    app.use(
        '/api',
        createProxyMiddleware({
            // When running locally, you can change this URL to point to your stack
            // This will prevent CORS errors when running locally
            target: process.env.REACT_APP_EXTERNAL_API_URL,
            changeOrigin: true,
        }),
    );
};
