import {Component} from "angular2/core";
/**
 * Created by pakunert on 14.03.2016.
 */

@Component({
    selector:'app',
    template:'<span>{{message}}</span>'
})
export class App{
    message:string = 'hello';
}
