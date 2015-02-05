var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    karma = require('gulp-karma');

// default task
gulp.task('default', ['clean', 'browserify', 'views', 'styles', 'dev', 'watch']);

// watch files for changes and rebundle and lint
gulp.task('watch', ['lint', 'dev'], function() {
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);

  gulp.watch(['app/index.html', 'app/templates/**/*.html'], [
    'views'
  ]);

  gulp.watch(['app/styles/*.scss'], [
    'styles'
  ]);

  gulp.watch(['dist/js/bundle.js'], [
    'test'
  ]);

});

gulp.task('clean', function() {
  gulp.src('dist/*.html')
    .pipe(clean());

  gulp.src('dist/templates/*')
    .pipe(clean());

  gulp.src('dist/js/*')
    .pipe(clean());

  gulp.src('dist/css/*')
    .pipe(clean());

  gulp.src('dist/fonts/*')
    .pipe(clean());
});

// JSHint
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
    .pipe(jshint())   
    .pipe(jshint.reporter('default'));
});

// KARMA / JASMINE
gulp.task('test', function() {
  return gulp.src('./fakefile')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

// browserify to resolve front end dependencies
gulp.task('browserify', function() {
  return browserify('./app/scripts/app.js')
    .bundle()
    .pipe(source('bundle.js'))

    .pipe(gulp.dest('./dist/js/'));
});

// copy html source to dist
gulp.task('views', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'));
    // .pipe(refresh(lrserver));

  gulp.src('app/templates/**/*')
    .pipe(gulp.dest('dist/templates/'))
    .pipe(refresh(lrserver));

});

gulp.task('styles', function() {
  gulp.src('app/styles/app.scss')
    .pipe(sass({onError: function(e) { console.log(e); } }))
    .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
    .pipe(gulp.dest('dist/css/'))
    .pipe(refresh(lrserver));

  gulp.src('app/styles/*.css')
    .pipe(gulp.dest('dist/css/'));

  gulp.src('app/styles/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('dev', ['browserify'], function() {

  // start webserver
  server.listen(serverport);

  // start live reload
  lrserver.listen(livereloadport);

  // watch for any file changes
  // gulp.run('watch');
});

// EXPRESS WEBSERVER for local dev
var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

var server = express();

server.use(livereload({ port: livereloadport }));

server.use(express.static('./dist'));

server.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist' });
});

