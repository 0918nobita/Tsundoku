const gulp = require('gulp'),
      typedoc = require('gulp-typedoc'),
      browserSync = require('browser-sync').create();

gulp.task('typedoc', () =>
  gulp
    .src(['./src/**/*.ts'])
    .pipe(typedoc({
      name: 'Tsundoku',
      module: 'commonjs',
      mode: 'modules',
      target: 'ES6',
      out: './docs',
      tsconfig: 'tsconfig.json',
      experimentalDecorators: true
    })));

gulp.task('browser-sync', () =>
  browserSync.init({
    server: {
      baseDir: './docs',
      index: 'index.html'
    }
  }));

gulp.task('bs-reload', () => browserSync.reload());

gulp.task('default', ['typedoc', 'browser-sync'], () => {
  gulp.watch('./src/**/*.ts', ['typedoc', 'bs-reload']);
  gulp.watch('../README.md', ['typedoc', 'bs-reload']);
});
