const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const apiMocker = require('connect-api-mocker');

//const MyWebpackPlugin = require('./my-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: {
    main: './src/app.js',
    result: './src/result.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  devServer: {
    overlay: true,
    stats: 'errors-only',
    historyApiFallback: true,
    before: (app) => {
      app.use(apiMocker('/api', 'mocks/api'));
    },
    hot: true,
  },
  optimization: {
    minimizer:
      mode === 'production'
        ? [
            new OptimizeCSSAssertsPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
    splitChunks: {
      chunks: 'all',
    },
  },
  externals: {
    axios: 'axios',
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: path.resolve('./my-webpack-loader.js')
      // },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // publicPath: './dist/',
          name: '[name].[ext]?[hash:5]',
          limit: 20000, // 20kb
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    //new MyWebpackPlugin()
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}
      `,
    }),
    new webpack.DefinePlugin({
      TWO: '1+1',
      TWO_STRING: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://dev.api.domain.com'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []),
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/axios/dist/axios.min.js',
          to: './axios.min.js',
        },
      ],
    }),
  ],
};
