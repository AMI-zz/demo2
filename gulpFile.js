/**
 * Created by Administrator on 2017/4/11.
 */
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cssnano = require("gulp-cssnano");
var less = require("gulp-less");
var htmlmin = require("gulp-htmlmin");
var browserSync = require("browser-sync").create();

gulp.task("less",function(){
    gulp.src("src/css/*.less")
        .pipe(less())
        // .pipe(cssnano())
        .pipe(gulp.dest("dist/styles"))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("html",function(){
    gulp.src("src/*.html")
        .pipe(htmlmin({
            collapseWhitespace:true,
            removeComments:true
        }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task("js",function(){
    gulp.src("src/js/*.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("image",function(){
    gulp.src("src/image/*.*")
        .pipe(gulp.dest("dist/images"))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("workflow",["image","js","html","less"],function(){
    browserSync.init({
       server:{
           baseDir:"./dist"
       }
    });
    gulp.watch("src/css/*.less",["less"]);
    gulp.watch("src/js/*.js",["js"]);
    gulp.watch("src/*.html",["html"]);
    gulp.watch("src/image/*.*",["image"]);
});