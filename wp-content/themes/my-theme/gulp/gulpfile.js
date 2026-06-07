const { src, dest, watch, series, parallel } = require("gulp");

// パス・テーマ設定（my-themeに最適化）
const themeName = "my-theme"; 
const srcBase = '../src';
const distBase = `../assets`; 

const srcPath = {
  css: `${srcBase}/sass/**/*.scss`,
  js: `${srcBase}/js/**/*.js`
};

const distPath = {
  css: `../assets/css/`,
  js: `../assets/js/`,
  php: '../**/*.php'
};

// ローカルサーバー（BrowserSync）
const browserSync = require("browser-sync").create();
const browserSyncFunc = (done) => {
  browserSync.init({
    proxy: 'http://localhost:8080/', // compose.ymlのポートと一致
    notify: false
  });
  done();
};

const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

// Sassコンパイル（DartSass + Autoprefixer）
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob-use-forward');
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer"); 
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const cssSass = (done) => {
  src(srcPath.css)
    .pipe(sourcemaps.init())
    .pipe(plumber({ errorHandler: notify.onError('Error:<%= error.message %>') }))
    .pipe(sassGlob())
    .pipe(sass.sync({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer()])) 
    .pipe(sourcemaps.write('.'))
    .pipe(dest(distPath.css))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(distPath.css));
  done();
};

// JavaScript圧縮
const uglify = require('gulp-uglify');
const jsCompress = (done) => {
  src(srcPath.js)
    .pipe(plumber({ errorHandler: notify.onError('Error:<%= error.message %>') }))
    .pipe(dest(distPath.js))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(distPath.js));
  done();
};

// 監視タスク
const watchFiles = (done) => {
  watch(srcPath.css, series(cssSass, browserSyncReload));
  watch(srcPath.js, series(jsCompress, browserSyncReload));
  watch(distPath.php, series(browserSyncReload));
  done();
};

// 安全なお掃除機能
const del = require('del');
const clean = (done) => {
  del([`../assets/css/**/*`, `../assets/js/**/*`], { force: true }).then(() => {
    done();
  });
};

// 実行コマンド設定
exports.default = series(clean, parallel(cssSass, jsCompress), parallel(watchFiles, browserSyncFunc));