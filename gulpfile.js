/*
gulpfile.js for lunaluna-wp-package 1.6.0
*/



var domain = 'dist17demo.dev'; // site.yml で hostname に入力したドメイン名


var themeDirectoryName = 'tsumugi-child'; // テーマ「ディレクトリ」の名前（テーマ名ではないことに注意！）


var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var cache        = require('gulp-cached');
var changed      = require('gulp-changed');
var mmq          = require('gulp-merge-media-queries');
var concat       = require('gulp-concat');
var csso         = require('gulp-csso');
var imagemin     = require('gulp-imagemin');
var jshint       = require('gulp-jshint');
var notify       = require('gulp-notify');
var phplint      = require('gulp-phplint');
var plumber      = require('gulp-plumber');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var sassLint     = require('gulp-sass-lint');
var sourcemaps   = require('gulp-sourcemaps');
var stylish      = require('jshint-stylish');
var uglify       = require('gulp-uglify');


// 各ディレクトリパスの設定
var dir     = {};
dir.theme = './public/wp-content/themes/' + themeDirectoryName;


gulp.task('sasslint', function() {
  return gulp.src(dir.theme + '/resources/sass/*.scss')
    .pipe(cache('sassLint'))
    .pipe(sassLint({
      files: {
        include: dir.theme + '/resources/sass/*.scss'
        // ignore: dir.theme + '/resources/sass/+(_bootstrap|_reset).scss'
      },
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('cssdev', function() {
  return gulp.src(dir.theme + '/resources/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'ie 9', 'Android >= 4', 'iOS >= 8']
    }))
    .pipe(concat('style.css'))
    .pipe(mmq({
      log: true
    }))
    .pipe(csso())
    .pipe(sourcemaps.write('./resources/map/'))
    .pipe(gulp.dest(dir.theme))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('lint', function() {
  return gulp.src(dir.theme + '/resources/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('jsdev', function() {
  return gulp.src(dir.theme + '/resources/js/setting.js')
    .pipe(uglify())
    .pipe(gulp.dest(dir.theme + '/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('images', function() {
  return gulp.src(dir.theme + '/resources/raw-images/*.+(jpg|jpeg|png|gif|svg)')
    .pipe(changed(dir.theme + '/images'))
    .pipe(imagemin({
      optimizationLevel: 7
    }))
    .pipe(gulp.dest(dir.theme + '/images'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('phplint', function() {
  return gulp.src([dir.theme + '/**/*.php'])
    .pipe(phplint())
});


gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: domain,
    notify: true
  });
});


gulp.task('bs-reload', function() {
  browserSync.reload();
});


gulp.task('watch', function() {
  gulp.watch(dir.theme + '/resources/sass/*.scss', ['sasslint', 'cssdev', 'bs-reload']);
  gulp.watch(dir.theme + '/resources/js/setting.js', ['lint', 'jsdev', 'bs-reload']);
  gulp.watch(dir.theme + '/resources/raw-images/*.+(jpg|jpeg|png|gif|svg)', ['images', 'bs-reload']);
  gulp.watch(dir.theme + '/**/*.php', ['phplint', 'bs-reload']);
});



gulp.task('dev', ['images', 'cssdev', 'jsdev']);
gulp.task('default', ['browser-sync', 'sasslint', 'phplint', 'lint', 'dev', 'watch']);
