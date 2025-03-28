const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',  
  output: {
    filename: 'bundle.js',  
    path: path.resolve(__dirname, 'dist'), 
    assetModuleFilename: "images/[name][ext]",
    clean: true,
  }, 
  plugins: [
    new MiniCssExtractPlugin({
        filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
          ],
        },
      },
    }),
  ],
  
  module: {
    rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i, 
          type: 'asset',
          generator: {
            filename: 'images/[name][ext]',
          },
        },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000, 
    open: true,
    watchFiles: ["src/**/*"],
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin(), new TerserPlugin()],

  },
}