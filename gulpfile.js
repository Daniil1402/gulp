const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const concat = require("gulp-concat");
const pug = require("gulp-pug");

gulp.task("sass", function() {
  return gulp
    .src("app/sass/*.sass")
    .pipe(sass())
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("app/css/"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("js", function() {
  return gulp
    .src("app/js/main/*.js")
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest("app/js/"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("pug", function() {
  return gulp
    .src("app/pug/*.pug")
    .pipe(
      pug({
        pretty: true,
      }),
    )
    .pipe(gulp.dest("app/"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    open: false,
    notify: false,
  });
});

gulp.task("watch", function() {
  gulp.watch("app/sass/*.sass", gulp.parallel("sass"));
  gulp.watch("app/js/main/*.js", gulp.parallel("js"));
  gulp.watch("app/pug/*.pug", gulp.parallel("pug"));
});

gulp.task("default", gulp.parallel("sass", "js", "pug", "watch", "browser-sync"));
