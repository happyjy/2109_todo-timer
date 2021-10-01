const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              publicPath: '../dist',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'src', 'index.html'),
    // }),
  ],
};
