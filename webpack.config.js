/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

var webpack = require('webpack');
var path = require('path');

/**
 * Get configuration for Webpack
 *
 * @see http://webpack.github.io/docs/configuration
 *      https://github.com/petehunt/webpack-howto
 *
 * @param {boolean} release True if configuration is intended to be used in
 * a release mode, false otherwise
 * @return {object} Webpack configuration
 */
module.exports = function(release) {
  return {
    entry: './app/scripts/main.js',

    output: {
      filename: 'main.js',
      path: './.tmp/scripts/',
      publicPath: './tmp/'
    },

    cache: !release,
    debug: !release,
    devtool: false,

    stats: {
      colors: true,
      reasons: !release
    },

    plugins: release ? [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        '__DEV__': false
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : [
      new webpack.DefinePlugin({'__DEV__': true}),
      // new webpack.ResolverPlugin(
      //   new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      // )

      // new webpack.ProvidePlugin({
      //     $: 'jquery',
      //     jQuery: 'jquery',
      //     'windows.jQuery': 'jquery'
      // })
    ],

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
      // root: [path.join(__dirname, 'bower_components')]
    },

    module: {
      preLoaders: [
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: 'jshint'
        // }
      ],

      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: '6to5-loader'
        }
        // {
        //   test: /\.css$/,
        //   loader: 'style!css'
        // },
        // {
        //   test: /\.less$/,
        //   loader: 'style!css!less'
        // },
        // {
        //   test: /\.gif/,
        //   loader: 'url-loader?limit=10000&mimetype=image/gif'
        // },
        // {
        //   test: /\.jpg/,
        //   loader: 'url-loader?limit=10000&mimetype=image/jpg'
        // },
        // {
        //   test: /\.png/,
        //   loader: 'url-loader?limit=10000&mimetype=image/png'
        // },
        // {
        //   test: /\.jsx?$/,
        //   loader: 'jsx-loader?harmony&stripTypes'
        // }
      ]
    }
  };
};
