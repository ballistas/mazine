"use strict";
var testing_1 = require("angular2/testing");
var demo_service_1 = require("./demo.service");
var testing_2 = require("angular2/testing");
/**
 * Created by pakunert on 15.03.2016.
 */
testing_1.describe('demoService', function () {
    testing_1.beforeEachProviders(function () { return [
        demo_service_1.DemoService
    ]; });
    testing_1.it('should return "value"', testing_2.inject([demo_service_1.DemoService], function (service) {
        testing_1.expect(service.invokeMethode()).toBe('result');
    }));
});
