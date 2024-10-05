const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  // other directives...
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: false
    })
  ]
});