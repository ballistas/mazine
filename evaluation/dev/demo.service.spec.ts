import {
    describe,
    beforeEachProviders,
    it,
    expect
} from "angular2/testing";

import {DemoService} from "./demo.service";
import {inject} from "angular2/testing";
/**
 * Created by pakunert on 15.03.2016.
 */


describe('demoService',()=>{

    beforeEachProviders(()=>[
        DemoService
    ]);

    it('should return "value"',inject([DemoService],(service)=>{
        expect(service.invokeMethode()).toBe('result');
    }));
});