///<reference path="../typings/jasmine/jasmine" />

import * as ng2 from "@angular/core/testing";
import * as play from "./play.domain";

/**
 * Created by pakunert on 27.04.2016.
 */

describe('Maazine',function(){

    beforeEach(function(){
        console.log('initialize...')
    });

    it('should',function(){

        expect(1).toBe(2);
    });
});

describe('Scriptservice',function(){

    ng2.beforeEachProviders(function(){
        
    });
});
