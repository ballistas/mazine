/**
 * Created by pakunert on 11.03.2016.
 */

const gulp = require('gulp');
const tsCompiler = require('gulp-typescript');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');

const tsProject = tsCompiler.createProject('tsconfig.json');

gulp.task('compile',function(){

    var tscResult = tsProject.src()
        .pipe(
            tsCompiler(
                tsProject
            )
        );

    tscResult.js.pipe(
        gulp.dest('dist')
    );
})

gulp.task('test',function(){

    gulp.src('dist/**/*.spec.js')
        .pipe(jasmine({
            reporter: new reporters.TerminalReporter()
        }));
});

gulp.task('default',['compile','test']);