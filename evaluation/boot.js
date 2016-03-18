System.register(['angular2/platform/browser', './dist/app.application'], function(exports_1) {
    var browser_1, application;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                application = app_component_1_1;
            }
           ],
        execute: function() {
            browser_1.bootstrap(application.App, []);
        }
    }
});
//# sourceMappingURL=boot.js.map