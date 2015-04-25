'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var childProcess = require('child_process');

gulp.task('lint', function () {
  return gulp.src([
      'src/**/*.js',
      'src/**/*.jsx'
    ])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('images', function () {
  return gulp.src('src/public/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('transpile-src', function(cb) {
  childProcess.exec('babel src --out-dir dist', cb);
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('server', function() {
  var nodemon = require('nodemon');

  nodemon({
    // execMap: {
    //   js: 'node --harmony'
    // },
    ignore: [
      'test',
      'gulpfile.js',
      'node_modules'
    ],
    // ext: 'js jsx',
    script: 'server-bootstrap.js'
  });

  nodemon.on('start', function () {
    console.log('App has started');
  }).on('quit', function () {
    console.log('App has quit');
  }).on('restart', function (files) {
    console.log('App restarted due to: ', files);
  });
});

var webpackSettings = {
  stats: {
    colors: true,
    reasons: false,
    errorDetails: true,
    hash: false,
    version: false,
    timings: true,
    chunkModules: false,
    modules: true,
    cached: false,
    source: true
  }
};

function webpackTask(production, cb) {
  production = production ? production :
                (process.env.PRODUCTION ? true : false);

  var started = false;
  var config = require('./webpack.config')(production);
  var bundler = require('webpack')(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    $.util.log('[webpack]', stats.toString(webpackSettings.stats));

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (production) {
    bundler.run(bundle);
  } else {
    bundler.watch(200, bundle);
  }
}

gulp.task('webpack', webpackTask.bind(null, false));

gulp.task('webpack:build', webpackTask.bind(null, true));

gulp.task('webpack-dev-server', function(cb) {
  var WebpackDevServer = require('webpack-dev-server');
  var webpack = require('webpack');

  var compiler = webpack(require('./webpack.config')(false));

  var server = new WebpackDevServer(compiler, {
    filename: 'main.js',
    contentBase: 'http://0.0.0.0:8080',
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    watchDelay: 300,
    publicPath: 'http://0.0.0.0:8080/assets/',
    stats: webpackSettings.stats
  });
  server.listen(9000, '0.0.0.0', cb);
});

gulp.task('watch', ['server', 'webpack-dev-server']);

gulp.task('build', ['lint', 'images', 'transpile-src', 'webpack:build'], function() {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
