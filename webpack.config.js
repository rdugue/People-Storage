var path = require('path');

module.exports = {
  entry: './src/app.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
        vue: 'vue/dist/vue.js'
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist') 
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      }
    ]
  }
};