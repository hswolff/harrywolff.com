'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

/**
 * Get configuration for Webpack.
 *
 * @param {boolean} production True if configuration is intended to be used in
 * production mode, false otherwise
 * @return {object} Webpack configuration
 */
module.exports = function(production) {
  var config = {
    entry: {
      app: ['webpack/hot/dev-server', './app/scripts/main.js']
    },

    output: {
      path: path.join(__dirname, './app'),
      filename: 'main.js',
      publicPath: '/'
    },

    cache: false,
    debug: false,
    devtool: false,

    plugins: [
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      ),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ],

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
      root: [path.join(__dirname, 'bower_components')]
    },

    module: {
      noParse: [
        /bower_components/
      ],

      preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules|bower_components|twitter-tooltip/,
          loader: 'jshint'
        }
      ],

      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules|bower_components/,
          loader: '6to5-loader'
        }
      ]
    }
  };

  if (production === false) {
    config.cache = true;
    config.debug = true;
    config.devtool = false;

    config.output.publicPath = 'http://localhost:8080/';

    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({'__DEV__': true}),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]);

    config.module.loaders = config.module.loaders.concat([
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]);
  }

  if (production === true) {
    config.entry = './app/scripts/main.js';

    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        '__DEV__': false
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new ExtractTextPlugin('main.css', {
        allChunks: true
      })
    ]);

    config.module.loaders = config.module.loaders.concat([
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      }
    ]);
  }

  return config;
};
