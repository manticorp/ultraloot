const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: true
    })
  ]
});
