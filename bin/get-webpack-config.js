const webpack = require('webpack');
const path = require('path');
const requireFromString = require('require-from-string');
const MemoryFS = require('memory-fs');
const deasync = require('deasync');

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, '..');

let getServerString;

/**
 * Getter for webpack config for all the different kind of builds there is in this repo
 * @param  {Object} options        Passed from building, starting and testing the application
 * @param  {Object} privateOptions Only passed from `getServerString`, used to add some private options relevent only to this file
 * @return {Object}                Webpack config object
 */
const getWebpackConfig = (options = ({}), privateOptions = ({})) => {
  const {
    isProd = false,
    isSsr = false,
    isWebpackDevServer = false,
    isTest = false,
    coveragePaths = [],
    port,
    globals = ({})
  } = options;

  const {
    isClientBuild = true
  } = privateOptions;

  return ({
    bail: true,
    devtool: isTest ? 'inline-source-map' : (isProd ? false : 'source-map'),
    entry: isTest ? undefined : {
      [`app${isProd ? '.min' : ''}`]: (
        isWebpackDevServer ? [`webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/dev-server'] : []
      ).concat(path.join(rootPath, 'src', 'entry-points', isClientBuild ? 'client.jsx' : 'server.jsx'))
    },
    output: isTest ? undefined : {
      path: path.join(rootPath, 'www'),
      filename: '[name].js',
      libraryTarget: isClientBuild ? undefined : 'umd'
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
        disable: isWebpackDevServer,
        allChunks: true
      }),
      new webpack.DefinePlugin(
        Object.assign({
          __PROD__: JSON.stringify(isProd),
          __DEV__: JSON.stringify(!isProd),
          __DEVSERVER__: JSON.stringify(isWebpackDevServer),
          __DEVTOOLS__: JSON.stringify(isWebpackDevServer),
          __CLIENT__: JSON.stringify(isClientBuild),
          __SERVER__: JSON.stringify(!isClientBuild),
          'process.env': {
            NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
          }
        },
          Object.keys(globals).reduce( // Stringify all the globals
            (obj, k) => Object.assign(obj, {
              [k]: JSON.stringify(globals[k])
            }),
            {}
          )
        )
      )
    ]
    .concat(isClientBuild ? [
      new HtmlWebpackPlugin({
        minify: {},
        getAppContent: () => (isSsr ? getServerString(options) : ''),
        template: path.join(rootPath, 'src', 'index.ejs'),
        inject: 'body'
      })
    ] : [])
    .concat(isTest ? [] : new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }))
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
                presets: ['es2015', 'stage-2'],
                plugins: ['transform-runtime']
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
                presets: ['es2015', 'stage-2', 'react'].concat(isWebpackDevServer ? ['react-hmre'] : []),
                plugins: ['transform-runtime']
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader'
              }
            ],
            fallback: 'style-loader'
          })
        }, {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'resolve-url-loader',
                options: {
                  fail: true
                }
              },
              {
                loader: 'sass-loader'
              }
            ],
            fallback: 'style-loader'
          })
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
      .concat(isTest ? [
        // { // `istanbul-instrumenter` all the code We want to be in the coverage report
        //   test: /\.(js|jsx)$/,
        //   enforce: 'post',
        //   include: coveragePaths,
        //   use: [
        //     {
        //       loader: 'istanbul-instrumenter-loader?dd'
        //     }
        //   ]
        // }
      ] : [])
    },
    resolve: {
      modules: [
        rootPath,
        path.join(rootPath, 'node_modules')
      ]
    }
  });
};

/**
 * Sync getter for the server rendered app, good for showing something on the page while javascript execute on initial load
 * @param  {Object} options Passed as is from `getWebpackConfig`
 * @return {String}         String which contains the server rendered app
 */
getServerString = options => {
  const { isProd } = options;
  const bundlePath = path.join(rootPath, 'www', `app${isProd ? '.min' : ''}.js`);

  const fs = new MemoryFS();

  const compiler = webpack(
    getWebpackConfig(options, { isClientBuild: false })
  );

  let sync = true;
  let data = null;
  compiler.outputFileSystem = fs;
  compiler.run(err => {
    if (err) {
      throw err;
    }
    const fileContent = fs.readFileSync(bundlePath).toString('ascii');
    data = requireFromString(fileContent);
    sync = false;
  });

  while (sync) {
    deasync.sleep(100);
  }

  return data;
};

module.exports = getWebpackConfig;
