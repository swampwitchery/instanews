const gulp = require('gulp');
const uglifycss = require('gulp-uglifycss');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const prettyError = require('gulp-prettyerror');


// Task to compiling and minifying Sass
gulp.task('sass', function () {
  return gulp
    .src('./sass/*.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(uglifycss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./build/css'));
});

//JS
gulp.task('script', function (done) {
  return gulp
    .src('./js/*.js') // What files do we want gulp to consume?
    .pipe(prettyError())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({
      extname: '.min.js'
    })) // Rename the uglified file
    .pipe(gulp.dest('./build/js')); // Where do we put the result?
  done();
});

//Task to watch for changes to CSS files
gulp.task('watch', function (done) {
  gulp.watch('sass/*.scss', gulp.series('sass'));
  gulp.watch('js/*.js', gulp.series('script'));
  done();
});

// Load browersync
gulp.task('browser-sync', function (done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp
    .watch(['build/css/*.css', 'build/js/*.js'])
    .on('change', browserSync.reload);
  done();
});

//Default task 
gulp.task('default', gulp.parallel('browser-sync', 'watch'));