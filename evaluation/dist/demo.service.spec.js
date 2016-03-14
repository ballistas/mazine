"use strict";
var demo_service_1 = require("./demo.service");
/**
 * Created by pakunert on 11.03.2016.
 */
describe('DemoService', function () {
    var service = new demo_service_1.DemoService();
    it('behaviour', function () {
        expect(service).not.toBeNull();
    });
});
