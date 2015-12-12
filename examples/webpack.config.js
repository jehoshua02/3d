var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');
var NotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlPlugin({
      title: '3D Examples',
      favicon: path.resolve(__dirname, './src/favicon.png')
    }),
    new NotifierPlugin({
      alwaysNotify: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', '..', '.']
  }
};
