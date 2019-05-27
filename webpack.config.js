const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "src", "index.html"),
  filename: "./index.html"
});

module.exports = {
  context: __dirname,
  entry: path.resolve(__dirname, "src", "App.jsx"),
  devtool: "eval-source-map",
  plugins: [htmlPlugin],
  resolve: {
    alias: {
      db$: path.resolve(__dirname, "src", "db.js")
    },
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      // {
      //   enforce: "pre",
      //   test: /\.jsx?$/,
      //   loader: "eslint-loader",
      //   exclude: /node_modules/
      // },
      { test: /\.jsx?$/, loader: "babel-loader" }
    ]
  }
};
