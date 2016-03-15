"use strict";
const testing_1 = require("angular2/testing");
const demo_service_1 = require("./demo.service");
const testing_2 = require("angular2/testing");
/**
 * Created by pakunert on 15.03.2016.
 */
testing_1.describe('demoService', () => {
    testing_1.beforeEachProviders(() => [
        demo_service_1.DemoService
    ]);
    testing_1.it('should return "value"', testing_2.inject([demo_service_1.DemoService], (service) => {
        testing_1.expect(service.invokeMethode()).toBe('result');
    }));
});
