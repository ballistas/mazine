/**
 * Created by pakunert on 25.04.2016.
 */
import * as NG from "@angular/core";
import * as PLAY from "./play.domain";

@NG.Component({
    selector:'app-cmp',
    template:`
        <h2>application</h2>
       <button (click)="doAction()">CLICK Service</button>
    `,

    directives:[],
    providers:[PLAY.ScriptService]
})
export class App implements NG.OnInit{

    constructor(private _service:PLAY.ScriptService){

    }

    public doAction(){

        console.log('do action...');

        console.log('>>'+this._service.find().length);

        //console.log('do action...');
    }

    public ngOnInit(){

        
    }
}