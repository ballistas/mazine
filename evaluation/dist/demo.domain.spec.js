"use strict";
var demo_domain_1 = require("./demo.domain");
/**
 * Created by pakunert on 11.03.2016.
 */
/// <reference path="typings/tsd.d.ts">
describe('Demo', function () {
    var demo;
    beforeEach(function () {
        demo = new demo_domain_1.Demo();
    });
    it('should be defined', function () {
        expect(demo).toBeNull();
    });
});
