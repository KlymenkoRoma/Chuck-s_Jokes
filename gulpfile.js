let
    gulp = require("gulp"),
    less = require("gulp-less"),
    cssnano = require("gulp-cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    sync = require("browser-sync").create();

gulp.task("html", function(){
    return gulp.src("src/index.html")
        .pipe(gulp.dest("dist"));
});

gulp.task("app_less", function () {
    return gulp.src("src/styles/**/*.less")
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat("main.min.css"))
        .pipe(cssnano())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css"))
        .pipe(sync.stream());
});

gulp.task("vendor_css", function () {
    return gulp.src("node_modules/bootstrap/dist/css/bootstrap.min.css")
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("js", function () {
    return gulp.src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/angular/angular.min.js",
        "node_modules/slideout/dist/slideout.min.js",
        "src/js/*.js"
    ])
        .pipe(concat("main.min.js"))
        .pipe(gulp.dest("dist/js"))
});

gulp.task("fonts", function () {
    return gulp.src("src/fonts/*.otf")
        .pipe(gulp.dest("dist/fonts"))
});

gulp.task("images", function(){
    return gulp.src("src/images/*")
        .pipe(gulp.dest("dist/images"));
});

gulp.task("watch", ["html", "app_less", "vendor_css", "js", "fonts", "images"], function () {
    sync.init({
        server: "dist"
    });

    gulp.watch("src/styles/**/*.less", ["app_less"]);

    gulp.watch("src/index.html", ["html"]);
    gulp.watch("dist/index.html").on("change", sync.reload);

    gulp.watch("src/js/*.js", ["js"]);
    gulp.watch("dist/js/*.js").on("change", sync.reload);
});

gulp.task("default", ["watch"]);