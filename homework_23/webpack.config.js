const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'production',
  entry: './src/js/index.js', 
  output: {
    filename: 'bundle.js',  
    path: path.resolve(__dirname, 'dist'), 
    clean: true,
  }, 
  
  
  module: {
    rules: [
        {
          test: /\.scss$/,
          use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000, 
    open: true,
    hot: true,
  },
  optimization: {
    minimize: true,
    minimizer: [ `...`, new CssMinimizerPlugin() ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}