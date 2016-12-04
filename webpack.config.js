module.exports = {
  context: __dirname + '/src',
  entry: './main.js',
  output: {
    path: __dirname + '/dist/js',
    publicPath: 'js/',
    filename: 'script.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  devServer: {
    inline: true,
    contentBase: './dist',
  },
  devtool: '#eval-inline-source-map'
};
