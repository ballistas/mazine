/**
 * Created by pakunert on 24.03.2016.
 */

import * as NG from 'angular2/core';
import {VideoComponent} from "./video.component";

@NG.Component({
    selector:'stage',
    template:`
        <div>
            <h3>Stage</h3>
            <video-comp (key)="show($event)" ident="rhwaxOK1WX4"></video-comp>
            <div>
                {{message}}
            </div>
        </div>
    `,
    directives:[VideoComponent]
})
export class StageComponent implements NG.OnInit{

    private message:string;

    constructor(){

    }

    ngOnInit(){

    }

    show(event){

        this.message = event.payload;
    }


}
