var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var args = process.argv.slice(2);
var __PROD__ = args.indexOf('-p') !== -1;
var __DEV__ = !__PROD__;

var webpackPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(__DEV__),
    __PROD__: JSON.stringify(__PROD__),
    __CLIENT__: JSON.stringify(true),
    __SERVER__: JSON.stringify(false)
  })
];

var webpackModule = {
  loaders: [{
    test: /\.jsx?$/,
    loaders: ['react-hot', 'babel'],
    exclude: /node_modules/
  }, {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }]
};

var getServerString = function() {
  var MemoryFS = require("memory-fs");
  var fs = new MemoryFS();

  var serverConfig = {
    target: 'node',
    entry: './src/entry-points/Server.jsx',
    output: {
      path: '/',
      filename: 'bundle.js'
    },
    plugins: webpackPlugins,
    module: webpackModule
  };

  var sync = true;
  var data = null;

  var compiler = webpack(serverConfig);
  compiler.outputFileSystem = fs;
  compiler.run(function(err, stats) {
    if (err) {
      throw err;
    }
    var fileContent = fs.readFileSync('/bundle.js').toString('ascii');
    data = eval(fileContent);
    sync = false;
  });

  while (sync) {
    require('deasync').sleep(100);
  }

  return data;
}

module.exports = {
  devtool: __DEV__ ? 'source-map' : false,
  entry: [
    'webpack-dev-server/client?',
    'webpack/hot/only-dev-server',
    './src/entry-points/Client.jsx'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: webpackPlugins.concat([
    new HtmlWebpackPlugin({
      minify: __PROD__,
      title: 'TodoMVC app',
      bodyContent: (function() {
        if (__DEV__) {
          return '';
        } else {
          // Production

          // Define globals to be used in the app
          GLOBAL.__DEV__ = __DEV__;
          GLOBAL.__PROD__ = __PROD__;
          GLOBAL.__CLIENT__ = false;
          GLOBAL.__SERVER__ = true;

          // require("babel/register");
          var AppHtmlString = getServerString();
          return AppHtmlString;
        }
      })(),
      template: './src/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    })
  ]).concat(__PROD__ ? [new webpack.optimize.UglifyJsPlugin()] : []),
  module: webpackModule
};
