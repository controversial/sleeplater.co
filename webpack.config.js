/* eslint-disable no-console */

const path = require('path');

module.exports = {
  mode: 'development',

  entry: path.join(__dirname, 'src'),

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    noInfo: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
};
