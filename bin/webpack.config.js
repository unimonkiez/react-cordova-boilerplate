const getWebpackConfig = require('./get-webpack-config.js');

const args = process.argv.slice(2);
const isProd = args.indexOf('-p') !== -1;

module.exports = getWebpackConfig({ isProd });
