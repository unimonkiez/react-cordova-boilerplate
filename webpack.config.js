'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __PROD__ = process.env.NODE_ENV === 'production';
const __CORDOVA__ = process.env.BUILD_TARGET === 'cordova';
const __DEV__ = __PROD__ === false;

const packageFile = require('./package.json');

 // Take cordova enviroment, if not prod, if not dev
const enviroment = packageFile.enviroments[
  (__CORDOVA__ && '__CORDOVA__') ||
  (__PROD__ && '__PROD__') ||
  (__DEV__ && '__DEV__')
];

const __SSR__ = enviroment.__SSR__;
const __DEVTOOLS__ = enviroment.__DEVTOOLS__;

const define = {
  __DEV__: JSON.stringify(__DEV__),
  __PROD__: JSON.stringify(__PROD__),
  'process.env': {
    NODE_ENV: JSON.stringify(__PROD__ ? 'production' : 'development')
  },
  __CORDOVA__: JSON.stringify(__CORDOVA__),
  __SSR__: JSON.stringify(__SSR__),
  __DEVTOOLS__: JSON.stringify(__DEVTOOLS__)
};

let getServerString;
const webpackConfig = {
  devtool: __DEV__ ? 'source-map' : false,
  devServer: {
    host: '0.0.0.0'
  },
  entry: './src/entry-points/Client.jsx',
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign(define, {
      __CLIENT__: JSON.stringify(true),
      __SERVER__: JSON.stringify(false)
    })),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      minify: {},
      getAppContent: () => __SSR__ ? getServerString() : '',
      template: './src/index.ejs', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    })
  ].concat(__PROD__ ? [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      },
      sourceMap: false
    })
  ] : []),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          env: {
            development: {
              presets: ['react-hmre']
            }
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        loader: __PROD__ ? ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
        )
        : 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&minetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      }
    ]
  }
};

getServerString = () => {
  const MemoryFS = require('memory-fs');
  const fs = new MemoryFS();

  const compiler = webpack(Object.assign(webpackConfig, {
    entry: './src/entry-points/Server.jsx',
    output: {
      path: '/',
      filename: 'bundle.js'
    },
    module: Object.assign(webpackConfig.module, {
      loaders: webpackConfig.module.loaders.map(loaderObj => {
        let returnedLoaderObj;
        if (loaderObj.test.toString() === /\.(scss|css)$/.toString()) {
          returnedLoaderObj = Object.assign(loaderObj, {
            loader: 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass'
          });
        } else {
          returnedLoaderObj = loaderObj;
        }
        return returnedLoaderObj;
      })
    }),
    plugins: [
      new webpack.DefinePlugin(Object.assign(define, {
        __CLIENT__: JSON.stringify(false),
        __SERVER__: JSON.stringify(true)
      }))
    ]
  }));

  let sync = true;
  let data = null;
  compiler.outputFileSystem = fs;
  compiler.run(err => {
    if (err) {
      throw err;
    }
    const fileContent = fs.readFileSync('/bundle.js').toString('ascii');
    // Using eval because we can't require from `memory-fs`
    data = eval(fileContent); // eslint-disable-line no-eval
    sync = false;
  });

  while (sync) {
    require('deasync').sleep(100);
  }

  return data;
};

module.exports = webpackConfig;
