import gulp from "gulp";
import browserify from "browserify";
import babelify from "babelify"
import source from "vinyl-source-stream";
import connect from "gulp-connect";
import open from "gulp-open";
import lint from "gulp-eslint";
import concat from "gulp-concat";

gulp.task("connect", () => {
    connect.server({
    base: "http://localhost",
    port: 9000,
    root: ["dist"],
    livereload: true
});
});

gulp.task("open", () => {
    gulp.src("dist/index.html")
    .pipe(open({uri: "http://localhost:9000/"}));

});

gulp.task("html", () => {
    gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dist"))
    .pipe(connect.reload());
});

gulp.task("lint", ()=>{
    return gulp.src("./src/**/*.js")
        .pipe(lint())
        .pipe(lint.format());

});

gulp.task("js", ["lint"], () => {
    browserify()
        .transform(babelify)
        .require("./src/app.js", { entry: true })
        .bundle()
        .on("error", function (err) { console.log("Error: " + err.message); })
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./dist/scripts/"))
        .pipe(connect.reload());
});

gulp.task("css", ()=>{
   gulp.src(["./node_modules/bootstrap/dist/css/*.min.css", "./src/css/**/*.css"])
       .pipe(concat("bundle.css"))
       .pipe(gulp.dest("./dist/css/"))
       .pipe(connect.reload());
});

gulp.task("watch", ()=>{
    gulp.watch("./src/**/*.js", ["js"]);
    gulp.watch("./src/**/*.html", ["html"]);
    gulp.watch("./src/**/*.css", ["css"]);
});

gulp.task("default", ["html", "js", "css", "connect", "open", "watch"], () => {
    console.log("DONE");
});