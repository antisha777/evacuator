const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

// Пути к файлам
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'docs/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'docs/js/'
  },
  html: {
    src: 'src/*.html',
    dest: 'docs/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'docs/images/'
  }
};

// Компиляция SCSS в CSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Обработка JavaScript
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Копирование HTML
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest)) // ИСПРАВЛЕНО: paths.html.dest
    .pipe(browserSync.stream());
}

// Копирование изображений (без сжатия)
function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Сервер и отслеживание файлов
function serve() {
  browserSync.init({
    server: {
      baseDir: './docs',
      index: 'index.html' // явно указываем индексный файл
    },
    port: 3000,
    open: true,
    notify: false
  });

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.images.src, images);
}

// Отдельные задачи
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.serve = serve;

// Сборка проекта
const build = gulp.parallel(styles, scripts, html, images);

// Задача по умолчанию
exports.default = gulp.series(build, serve);