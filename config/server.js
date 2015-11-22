var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  hot: true,
  historyApiFallback: true,
  headers: {"Access-Control-Allow-Origin": "*"},
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
}).listen(3000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});