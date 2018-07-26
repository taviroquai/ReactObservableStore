const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./example/index.html",
  filename: "./index.html"
});

const babelRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
};

const cssRule = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"]
};

const fileRule = {
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {}
    }
  ]
};

const rules = [];
rules.push(babelRule);
rules.push(cssRule);
rules.push(fileRule);

const plugins = [];
plugins.push(htmlPlugin);

module.exports = {
  entry: './example/index.js',
  module: {
    rules: rules
  },
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000
  }
};