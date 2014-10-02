var gulp = require('gulp');
var changed = require('gulp-changed');
var esperanto = require('gulp-esperanto');
var esnext = require('gulp-esnext');
var sourcemaps = require('gulp-sourcemaps');
// var del = require('del');

var paths = {
  src: 'src/**/*.js',
  src_dest: 'lib',
  lib: 'lib/**/*.js',
  lib_dest: 'dist'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  // del(['build'], cb);
  cb();
});

gulp.task('es6-node', ['clean'], function() {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
      .pipe(changed(paths.src_dest))
      .pipe(esperanto())
      .pipe(esnext({
        generator: false,
        modules: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.src_dest));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.src, ['es6-node']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'es6-node']);
