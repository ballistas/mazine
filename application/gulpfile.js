/**
 * Created by pakunert on 27.04.2016.
 */

var System = require('systemjs');
var reflect = require('reflect-metadata');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var report = require('jasmine-reporters');

gulp.task('test', function () {

    gulp.src('dist/**/*.spec.js')
        .pipe(jasmine({
            reporter: new report.TerminalReporter()
        }));
});