/**
 * Created by pakunert on 21.04.2016.
 */

System.register(['@angular/platform-browser-dynamic','./dist/application.app'],function(exports){
    var browser_1,application_1;

    return {
        setters: [
            function (browser) {

                browser_1 = browser;
            },
            function (app) {
                application_1 = app;
            }
        ],
        
        execute: function () {
            browser_1.bootstrap(
                application_1.App, []
            );
        }
    }
});