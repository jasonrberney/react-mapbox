/*
    ./webpack.config.js
*/
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = {
  entry: './src/index.js',
  output: {
    //path: path.resolve('/dist/'),
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.scss$/, loaders: ["style", "css", "sass"], exclude: "/node_modules" },
    ]
  },
  // resolve: { 
  //   root: path.resolve('./src') // THIS ALLOWS FOR EXPORTING WITH 'components' INSTEAD OF '../components'
  // },
  plugins: [HtmlWebpackPluginConfig]
}