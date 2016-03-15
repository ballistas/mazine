import {Injectable} from "angular2/core";
/**
 * Created by pakunert on 15.03.2016.
 */

@Injectable()
export class DemoService{

    public invokeMethode():string{

        return 'result';
    }
}
