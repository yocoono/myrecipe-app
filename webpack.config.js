const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: './src/app.js',
    edit: './src/edit.js'
  },
  output: {
    path: path.join(__dirname, 'public/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'] // 変更前は 'env'
        }
      }
    }, {
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    })
  ],
  devtool: 'cheap-module-eval-source-map', // エラーの際にdeveloper toolで元ファイルと場所を教えてくれる
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
};
