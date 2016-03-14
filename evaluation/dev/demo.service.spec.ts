import {DemoService} from "./demo.service";
/**
 * Created by pakunert on 11.03.2016.
 */

describe('DemoService',()=>{

    let service = new DemoService();

    it('behaviour',()=>{

        expect(service).not.toBeNull();
    });
});
