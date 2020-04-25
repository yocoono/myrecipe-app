const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const MODE = "development";
const MODE = "production";
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: {
    app: './src/scripts/app.js',
    edit: './src/scripts/edit.js'
  },
  output: {
    path: path.join(__dirname, 'public/assets'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: enabledSourceMap,
            url: false
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: enabledSourceMap
          },
        },
      ],
    }, {
      test: /\.(jpg|png|svg)$/,
      exclude: /node_modules/,
      loader: 'file-loader',
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};
