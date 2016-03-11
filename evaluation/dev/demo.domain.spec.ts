import {Demo} from "./demo.domain";
/**
 * Created by pakunert on 11.03.2016.
 */

/// <reference path="typings/tsd.d.ts">

describe('Demo',()=>{

    var demo;

    beforeEach(()=>{
        demo = new Demo();
    });

    it('should be defined',()=>{

        expect(demo).toBeNull();

    });
});