const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/ws",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
      ws: true, // important!
    })
  );
};
