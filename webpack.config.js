const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DeclareComponentsPlugin = require('./plugins/declare-components-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entries = {};
entries.index = './src/index/index.js';
entries.common = './src/common/common.js';
entries.webcomponents = './src/common/components/webcomponents/webcomponents.js';

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DeclareComponentsPlugin(),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index/index.html',
    }),
    new InlineChunkManifestHtmlWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
    }),
    new CopyWebpackPlugin([{ from: 'src/assets/', to: 'assets/' }]),
    new CopyWebpackPlugin([{ from: 'src/google/', to: '' }]),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        }),
        include: /\.module\.s?[ac]ss$/,
      },
      {
        test: /\.s?[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
        exclude: /\.module\.s?[ac]ss$/,
      },
      {
        test: /\.html$/,
        use: 'html-loader?interpolate',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader?name=assets/img/[name].[ext]',
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  devServer: {
    contentBase: './dist',
  },
  watchOptions: {
    ignored: ['/src/common/components/webcomponents/webcomponents.js'],
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['.js', '.jsx'],
  },
};
