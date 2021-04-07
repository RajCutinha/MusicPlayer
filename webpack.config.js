const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV ? "production" : "development";

module.exports = {
  mode,
  entry: "./src/index.js",

  output: {
    assetModuleFilename: "assets/[hash][ext][query]",
    path: path.resolve(__dirname, "dist"),
    filename: "./js/bundle.js",
    publicPath: "",
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: ".." },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "./css/[name].css" }),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    enforceExtension: false,
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};
