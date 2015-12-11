var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extend = require('util')._extend;

var args = process.argv.slice(2);
var __PROD__ = args.indexOf('-p') !== -1;
var __CORDOVA__ = args.indexOf('-c') !== -1 && __PROD__ === false;
var __DEV__ = __PROD__ === false && __CORDOVA__ === false;

var package = require('./package.json');
var enviroment = package.enviroments[__PROD__ ? '__PROD__' : __DEV__ ? '__DEV__' : __CORDOVA__ ? '__CORDOVA__' : ''];

var __MINIFICATION__ = enviroment.__MINIFICATION__;
var __SOURCEMAP__ = enviroment.__SOURCEMAP__;
var __SSR__ = enviroment.__SSR__;
var __DEVTOOLS__ = enviroment.__DEVTOOLS__;

var globals = {
    __DEV__: JSON.stringify(__DEV__),
    __PROD__: JSON.stringify(__PROD__),
    __CORDOVA__: JSON.stringify(__CORDOVA__),
    __DEVTOOLS__: JSON.stringify(__DEVTOOLS__),
    __CLIENT__: undefined,
    __SERVER__: undefined
  };
var webpackPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin("styles.css")
];

var webpackModule = {
  loaders: [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel?presets[]=es2015,presets[]=stage-0'
  },
  {
    test: /\.jsx$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192'
  }, {
    test: /\.(scss|css)$/,
    loader: __MINIFICATION__ ? ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') : 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
  }, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader?limit=10000&minetype=application/font-woff"
  }, {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader"
  }]
};

var getServerString = function() {
  var MemoryFS = require("memory-fs");
  var fs = new MemoryFS();
  var ssrGlobals = extend(globals, {
    __CLIENT__: JSON.stringify(false),
    __SERVER__: JSON.stringify(true)
  });
  var serverConfig = {
    target: 'node',
    entry: './src/entry-points/Server.jsx',
    output: {
      path: '/',
      filename: 'bundle.js'
    },
    plugins: webpackPlugins,
    module: webpackModule,
    exclude: /node_modules/
  };
  // Define globals to be used in the app on serverside
  for (var prop in ssrGlobals) {
    GLOBAL[prop] = JSON.parse(globals[prop]);
  }

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
  devtool: __SOURCEMAP__ ? 'source-map' : false,
  entry: ['./src/entry-points/Client.jsx'].concat(
    // Don't add webpack dev server sources in cordova
    __CORDOVA__ ? [] : [
    'webpack-dev-server/client?',
    'webpack/hot/only-dev-server'
  ]),
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: webpackPlugins.concat([
    new webpack.DefinePlugin(extend(globals, {
      __CLIENT__: JSON.stringify(true),
      __SERVER__: JSON.stringify(false)
    })),
    new HtmlWebpackPlugin({
      minify: {},
      title: 'TodoMVC app',
      bodyContent: __SSR__ ? getServerString() : '',
      template: './src/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    })
  ]).concat(__MINIFICATION__ ? [new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })] : []),
  module: webpackModule,
  exclude: /node_modules/
};
