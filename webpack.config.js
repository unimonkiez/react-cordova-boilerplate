var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var __PROD__ = process.env.NODE_ENV === 'production';
var __DEV__ = !__PROD__;

module.exports = {
  devtool: __DEV__ ? 'source-map' : false,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/entry-points/Client.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(__DEV__),
      __PROD__: JSON.stringify(__PROD__),
      __CLIENT__: JSON.stringify(true),
      __SERVER__: JSON.stringify(false)
    }),
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

          require("babel/register");
          var AppHtmlString = require('./src/entry-points/Server.jsx');
          return AppHtmlString;
        }
      })(),
      template: './src/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    })
  ].concat(__PROD__ ? [new webpack.optimize.UglifyJsPlugin()] : []),
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
}
