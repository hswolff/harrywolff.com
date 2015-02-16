/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('jshint', function () {
  return gulp.src([
      'app/scripts/**/*.js',
      '!app/scripts/**/twitter*.js',
      'src/**/*.js'
    ])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: '{app}'});

  return gulp.src('app/*.html')
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('serve', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});

gulp.task('server', function() {
  var nodemon = require('nodemon');

  nodemon({
    // execMap: {
    //   js: 'node --harmony'
    // },
    ignore: ['app', 'test', 'gulpfile.js'],
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

gulp.task('webpack:build', function() {
  process.env.PRODUCTION = true;
  gulp.start('webpack');
});

gulp.task('webpack', function(cb) {
  var production = process.env.PRODUCTION ? true : false;
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
});

gulp.task('webpack-dev-server', function(cb) {
  var WebpackDevServer = require('webpack-dev-server');
  var webpack = require('webpack');

  var compiler = webpack(require('./webpack.config')(false));

  var server = new WebpackDevServer(compiler, {
    filename: 'main.js',
    contentBase: 'http://localhost:9000',
    hot: true,
    // inline: true, // doesn't seem to do anything?
    quiet: false,
    noInfo: false,
    lazy: false,
    watchDelay: 300,
    publicPath: 'http://localhost:9000/assets/',
    stats: webpackSettings.stats
  });
  server.listen(8080, 'localhost', cb);
});

gulp.task('watch', ['server', 'webpack-dev-server'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/images/**/*'
  ]).on('change', $.livereload.changed);
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras', 'webpack:build'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
