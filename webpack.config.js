'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

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

const extractIndexHtml = new ExtractTextPlugin('index.html');
const extractStyle = new ExtractTextPlugin('style.css');

const webpackConfig = {
  devtool: __DEV__ ? 'source-map' : false,
  devServer: {
    host: '0.0.0.0'
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: ''
  },
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
        test: /\.html$/,
        loader: 'html?interpolate'
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
module.exports = [
  Object.assign(webpackConfig, {
    devtool: false,
    devServer: Object.assign(webpackConfig.devServer, {
      hot: false
    }),
    entry: './src/index.html',
    output: Object.assign(webpackConfig.output, {
      filename: 'index.js'
    }),
    plugins: [
      new webpack.DefinePlugin(Object.assign(define, {
        __CLIENT__: JSON.stringify(false),
        __SERVER__: JSON.stringify(true)
      })),
      extractIndexHtml
    ],
    module: Object.assign(webpackConfig.module, {
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /\.html$/,
          loader: extractIndexHtml.extract('html?interpolate')
        },
        {
          test: /\.(scss|css)$/,
          loader: 'css?-url!sass'
        }
      ])
    })
  }),
  Object.assign(webpackConfig, {
    entry: './src/entry-points/Client.jsx',
    output: Object.assign(webpackConfig.output, {
      filename: 'bundle.js'
    }),
    plugins: [
      new webpack.DefinePlugin(Object.assign(define, {
        __CLIENT__: JSON.stringify(true),
        __SERVER__: JSON.stringify(false)
      })),
      extractStyle
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
    module: Object.assign(webpackConfig.module, {
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /\.(scss|css)$/,
          loader: __PROD__ ? extractStyle.extract(
            'style',
            'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
          )
          : 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
        }
      ])
    })
  })
];
