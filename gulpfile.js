const gulp = require('gulp')
const del = require('del')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const ts = require('gulp-typescript')
const pack = require('./package.json')
const tsconfig = require('./tsconfig.json')

const esmOutDir = 'es'
const commOutDir = 'lib'
const distOutDir = 'dist'

gulp.task('build_common', function () {
  return gulp.src(['index.ts'])
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({
      basename: 'index',
      extname: '.common.js'
    }))
    .pipe(gulp.dest(distOutDir))
})

gulp.task('build_esm', function () {
  return gulp.src(['index.ts'])
    .pipe(ts({
      strict: true,
      moduleResolution: 'node',
      noImplicitAny: true,
      target: 'es5',
      module: 'esnext',
      lib: ['dom', 'esnext']
    }))
    .pipe(rename({
      basename: 'index',
      extname: '.esm.js'
    }))
    .pipe(gulp.dest(esmOutDir))
    .pipe(rename({
      basename: 'all',
      extname: '.esm.js'
    }))
    .pipe(gulp.dest(distOutDir))
    .pipe(uglify())
    .pipe(rename({
      basename: 'all',
      suffix: '.esm.min',
      extname: '.js'
    }))
    .pipe(gulp.dest(distOutDir))
})

gulp.task('build_umd', function () {
  return gulp.src(['index.ts'])
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(babel({
      moduleId: pack.name,
      presets: ['@babel/env'],
      plugins: ['@babel/transform-modules-umd']
    }))
    .pipe(rename({
      basename: 'index',
      suffix: '.umd',
      extname: '.js'
    }))
    .pipe(gulp.dest(distOutDir))
    .pipe(uglify())
    .pipe(rename({
      basename: 'index',
      suffix: '.umd.min',
      extname: '.js'
    }))
    .pipe(gulp.dest(distOutDir))
})

gulp.task('clear', () => {
  return del([
    esmOutDir,
    distOutDir
  ])
})

gulp.task('build_all', gulp.parallel('build_common','build_esm', 'build_umd'))

gulp.task('build', gulp.series('clear', 'build_all'))
