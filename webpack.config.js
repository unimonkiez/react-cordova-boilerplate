var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(__DEV__)
        }),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            bodyContent: (function() {
                if (__DEV__) {
                    return '';
                } else {
                    // Production
                    require("babel/register");
                    var react = require('react');
                    var App = require('./src/containers/App.jsx');
                    var reactHtml = react.renderToString(react.createFactory(App)({}));
                    return reactHtml;
                }
            })(),
            template: './src/index.html', // Load a custom template
            inject: 'body' // Inject all scripts into the body
        })
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/,
            include: path.join(__dirname, 'src')
        }]
    }
}
