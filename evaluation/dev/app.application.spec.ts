//var reflect = require('reflect-metadata');

import {App} from "./app.application";
/**
 * Created by pakunert on 14.03.2016.
 */

describe('App',()=>{

    beforeEach(function () {

        this.app = new App(null);
    });

    it('should have message "hello"',function(){

        expect(this.app.message).toBe('hello');
    });
});
