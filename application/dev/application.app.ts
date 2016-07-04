/**
 * Created by pakunert on 25.04.2016.
 */
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";

import * as ngcore from "@angular/core";
import * as nghttp from '@angular/http';
import * as play from "./play.domain";
import * as user from "./user.domain";

@ngcore.Component({
    selector:'app-cmp',
    template:`
       <h2>application</h2>
       <button (click)="doAction()">CLICK Service</button>
    `,

    directives:[],
    providers:[play.ScriptService,nghttp.HTTP_PROVIDERS,user.ProfileService]
})
export class App implements ngcore.OnInit{

    constructor(
        private _service:play.ScriptService,
        private _profileService:user.ProfileService
    ){

    }

    public doAction(){

        console.log('>>'+this._service.find().length);

        //console.log('do action...');

        this._profileService.find(
            (profile:user.Profile)=>{
                return profile.surname==='pass';
            }
        );
    }

    public ngOnInit(){

        
    }
}