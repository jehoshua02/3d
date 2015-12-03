var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');
var NotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './examples/index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlPlugin({
      title: '3D Examples',
      favicon: './examples/favicon.png'
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
          presets: ['es2015']
        }
      }
    ]
  }
};
