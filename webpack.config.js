var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');
var NotifierPlugin = require('webpack-notifier');

module.exports = {
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
  ]
};
