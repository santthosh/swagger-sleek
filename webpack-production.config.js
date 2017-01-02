const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: [
    './node_modules/babel-polyfill/lib/index.js',
      path.join(__dirname, '/src/app/app.js')],
  // Webpack config options on how to obtain modules
  resolve: {
    // When requiring, you don't need to add these extensions
    extensions: ['', '.js', '.md', '.txt'],
    alias: {
      // material-ui requires will be searched in src folder, not in node_modules
      'material-ui': path.resolve(__dirname, '../src'),
      'material-ui-ref': path.resolve(__dirname, './node_modules/material-ui'),
    },
  },
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js', // Name of output file
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    // Transfer Files
    // Transfer Files
    new CopyWebpackPlugin([
      {from: 'src/www/css', to: 'css'},
      {from: 'src/www/images', to: 'images'},
      {from: 'src/www/index.html'},
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath],
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};

module.exports = config;
