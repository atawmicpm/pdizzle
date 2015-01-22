var gulp = require('gulp'),
		gutil = require('gulp-util'),
		jshint = require('gulp-jshint'),
		browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		concat = require('gulp-concat'),
		clean = require('gulp-clean');

// watch files for changes and rebundle and lint
gulp.task('watch', ['lint'], function() {
	gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
		'lint',
		'browserify'
	]);

	gulp.watch(['app/index.html', 'app/views/**/*.html'], [
		'views'
	])
});

gulp.task('default', ['clean', 'browserify', 'views', 'dev']);

// function() {
// 	gulp.run('clean');
// 	gulp.run('browserify');
// 	gulp.run('views');
// 	gulp.run('dev');
// });

gulp.task('clean', function() {
	gulp.src('dist/*.html')
		.pipe(clean());

	gulp.src('dist/js/*')
		.pipe(clean());
});

// JSHint
gulp.task('lint', function() {
	gulp.src('./app/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
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

	gulp.src('app/views/**/*')
		.pipe(gulp.dest('dist/views/'))
		.pipe(refresh(lrserver));

});


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

gulp.task('dev', function() {

	// start webserver
	server.listen(serverport);

	// start live reload
	lrserver.listen(livereloadport);

	// watch for any file changes
	gulp.run('watch');
});