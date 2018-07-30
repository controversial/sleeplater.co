/* eslint-disable no-console */

const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: path.join(__dirname, 'src'),

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
  },

  module: {
    rules: [
      // SASS files
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // CSS files
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Vue template files
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      // JavaScript files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // HTML files
      {
        test: /\.html$/,
        loaders: [
          'file-loader?name=[path][name].html&context=src',
          'extract-loader',
          'html-loader',
        ],
      },
      // Files that require no compilation or processing
      {
        test: /\.(ttf|woff|woff2|eot|png|svg)/,
        loader: 'url-loader',
        query: { limit: 10000, name: '[path][name].[ext]', context: 'src' },
      },
    ],
  },

  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
    ]),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    noInfo: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
