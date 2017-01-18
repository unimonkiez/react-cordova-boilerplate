const path = require('path');
const webpack = require('webpack');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, '..');

module.exports = ({ isProd = false, isWebpackDevServer = false, port } = {}) => ({
  devtool: 'source-map',
  entry: {
    [`app${isProd ? '.min' : ''}`]: (
      isWebpackDevServer ? [`webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/dev-server'] : []
    ).concat(path.join(rootPath, 'src', 'index.js'))
  },
  output: {
    path: path.join(rootPath, 'dist'),
    filename: '[name].js',
    publicPath: ''
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: isWebpackDevServer,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(isProd),
      __DEV__: JSON.stringify(!isProd),
      __DEVSERVER__: JSON.stringify(isWebpackDevServer),
      'process.env': {
        NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
      }
    }),
    new HtmlWebpackPlugin({
      minify: {},
      template: path.join(rootPath, 'src', 'index.html'),
      inject: 'head'
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
  .concat(isWebpackDevServer ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [])
  .concat(isProd ? [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ] : []),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2']
            }
          }
        ]
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2', 'react'].concat(isWebpackDevServer ? ['react-hmre'] : [])
            }
          }
        ]
      }, {
        test: /\.css$/,
        use: [
          ExtractTextPlugin.extract({
            loader: 'to-string-loader',
            fallbackLoader: 'style-loader'
          }),
          {
            loader: 'css-loader'
          }
        ]
      }, {
        test: /\.woff(2)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './font/[hash].[ext]',
              mimetype: 'application/font-woff'
            }
          }
        ]
      }, {
        test: /\.(ttf|eot|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './font/[hash].[ext]'
            }
          }
        ]
      }, {
        test: /\.(gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './asset/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      rootPath,
      path.join(rootPath, 'node_modules')
    ]
  }
});
