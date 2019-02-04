var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'assets', 'webpack_bundles')
var APP_DIR = path.join(__dirname, 'src');

var config = {
  context: __dirname,
  entry: APP_DIR,
  devtool: 'inline-source-map',
  plugins: [
    new HTMLWebpackPlugin({
      template: 'assets/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleTracker({filename: './webpack-stats.dev.json'})
  ],
  output: {
    path: BUILD_DIR,
    filename: 'WeBooking.bundle.js',
    sourceMapFilename: 'WeBooking.map',
    publicPath: 'http://localhost:3000/'
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};

module.exports = config;
