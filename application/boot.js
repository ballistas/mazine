/**
 * Created by pakunert on 21.04.2016.
 */

System.register(['angular2/platform/browser','/dist/app.application'],function(exports){
    var browser,application;

    return {
        setters: [
            function (browser) {

                this.browser = browser;
            },
            function (app) {
                this.application = app;
            }
        ],
        execute: function () {
            browser.bootstrap(
                application.App, []
            );
        }
    }
});