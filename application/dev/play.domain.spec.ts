///<reference path="../typings/jasmine/jasmine" />

import {
    beforeEach,
    beforeEachProviders,
    afterEach,
    describe,
    expect,
    it,
    inject
} from "@angular/core/testing";
import * as play from "./play.domain";

/**
 * Created by pakunert on 27.04.2016.
 */

export let myMatchers = {

    toExceed100:()=>({
        compare:value =>{

            let result={
                pass:false,
                message:null
            };

            result.pass = value > 100;

            result.message = `${value} ${result.pass ? '>' : '<='} 100`;

            return result;
        }
    })
};

describe('Maazine',function(){


    beforeAll(function () {
        console.log('initialize suite...')
    });

    beforeEach(function(){
        console.log('initialize test...')
    });

    it('should',function(){

        expect(2).toBe(2);


    });
});

describe('Scriptservice',function(){

    let service;

    beforeEachProviders(()=>[play.ScriptService]);

    beforeEach(inject([play.ScriptService],ser=>{

        service = ser;
    }));

    it('should return 3 plays',()=>{

        let result = service.find();

        expect(result.length).toEqual(3);
    });
});


