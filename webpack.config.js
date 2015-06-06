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
  var cacheDir = path.join(__dirname, '.tmp');
  var jsxLoaders = ['babel-loader?cacheDirectory=' + cacheDir];

  var config = {
    entry: {
      main: [
        './src/client/index.jsx'
      ]
    },

    output: {
      filename: '[name].js',
      publicPath: '/assets/'
    },

    cache: false,
    debug: false,
    devtool: false,

    plugins: [
      new webpack.ProvidePlugin({
        React: 'react'
      })
    ],

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
      root: [
        path.join(__dirname)
      ]
    },

    module: {
      noParse: [
      ],

      preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        }
      ],

      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: jsxLoaders
        },
        {
          test: /\.gif/,
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        },
        {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        },
        {
          test: /\.png/,
          loader: 'url-loader?limit=10000&mimetype=image/png'
        },
        {
          test: /\.svg/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        },
        {
          test: /\.woff$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.woff2$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
        },
        {
          test: /\.ttf$/,
          loader: 'file-loader'
        },
        {
          test: /\.eot$/,
          loader: 'file-loader'
        },
        {
          test: /\.svg$/,
          loader: 'file-loader'
        }
      ]
    }
  };

  var cssLoaders = [
    'style-loader',
    'css-loader',
    'autoprefixer-loader?browsers=last 1 version'
  ];

  if (production === false) {
    config.entry.main.unshift('webpack/hot/only-dev-server');
    config.entry.main.unshift('webpack-dev-server/client?http://0.0.0.0:9000');

    config.cache = true;
    config.debug = true;
    config.devtool = '#cheap-module-eval-source-map';

    config.output.path = path.join(__dirname, './src/public/assets');
    config.output.publicPath = 'http://0.0.0.0:9000/assets/';

    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({'__DEV__': true}),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]);

    jsxLoaders.unshift('react-hot');

    config.module.loaders = config.module.loaders.concat([
      {
        test: /\.css$/,
        loader: cssLoaders.join('!')
      },
      {
        test: /\.less$/,
        loader: cssLoaders.concat('less-loader').join('!')
      }
    ]);
  }

  if (production === true) {
    config.output.path = path.join(__dirname, './dist/public/assets');

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

    var styleLoader = cssLoaders.shift();

    config.module.loaders = config.module.loaders.concat([
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(styleLoader, cssLoaders.join('!'))
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(styleLoader, cssLoaders.concat('less-loader').join('!'))
      }
    ]);
  }

  return config;
};
