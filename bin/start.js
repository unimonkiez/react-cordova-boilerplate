const getWebpackConfig = require('./get-webpack-config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const args = process.argv.slice(2);
const isProd = args.indexOf('-p') !== -1;
const port = 8080;

const webpackConfig = getWebpackConfig({
  isProd,
  globals: {
    __DEVTOOLS__: !isProd
  },
  isWebpackDevServer: true,
  port
});

const server = new WebpackDevServer(webpack(webpackConfig), {
  stats: {
    colors: true
  },
  hot: true
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Listening at localhost:${port}`);
});
