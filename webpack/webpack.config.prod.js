const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

const config = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    adminPage: './modules/AdminPage',
    homePage: './modules/HomePage',
    vendor: './vendor'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    devtoolLineToLine: true
  },
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "eslint-loader",
            options: {
              emitError: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader', 'stylefmt-loader']
        })
      },
      {
        test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[hash:6].[ext]&limit=4096'
            }
          }
        ]
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: '$'
          },
          {
            loader: 'expose-loader',
            options: 'jQuery'
          }
        ]
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin(),
    new StyleLintPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].bundle.js'
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['vendor', 'homePage']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'admin.html',
      chunks: ['vendor', 'adminPage']
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ]
};

module.exports = config;
