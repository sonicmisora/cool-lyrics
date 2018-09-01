const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.js'
  },
  devServer: {
    contentBase: [path.resolve(__dirname, 'demo'), path.resolve(__dirname, 'dist')]
  },
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: "[id].css"
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.styl$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/'
          }
        },
        'css-loader',
        'stylus-loader'
      ]
    }]
  },
  mode: 'development'
};