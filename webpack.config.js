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

module.exports = {
  devtool: __DEV__ ? 'source-map' : false,
  entry: './src/entry-points/Client.jsx',
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: ''
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(__DEV__),
      __PROD__: JSON.stringify(__PROD__),
      'process.env': {
        NODE_ENV: JSON.stringify(__PROD__ ? 'production' : 'development')
      },
      __CORDOVA__: JSON.stringify(__CORDOVA__),
      __SSR__: JSON.stringify(__SSR__),
      __DEVTOOLS__: JSON.stringify(__DEVTOOLS__),
      __CLIENT__: JSON.stringify(true),
      __SERVER__: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      minify: {},
      template: './src/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    }),
    new ExtractTextPlugin('style.css')
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
        test: /\.html$/,
        loader: 'html?interpolate'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      }, {
        test: /\.(scss|css)$/,
        loader: __PROD__ ? ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
          {
            notExtractLoader: 'css'
          }
        )
        : 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
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
