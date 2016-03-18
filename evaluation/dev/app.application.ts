///<reference path="../node_modules/angular2/typings/browser.d.ts" />
///<reference path="../node_modules/zone.js/dist/zone.js.d.ts" />

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {
    Component,
    OnInit
} from "angular2/core";
import {HTTP_PROVIDERS} from 'angular2/http';
import {ObservableService} from "./observable.service.demo";
import {Movie} from "./movie.domain";
/**
 * Created by pakunert on 14.03.2016.
 */

@Component({
    selector:'app',
    template:`
    <span>{{message}}</span>
    <ul>
        <li *ngFor="#movie of movies">{{movie.name}}</li>
    </ul>
    `,
    providers:[ObservableService,HTTP_PROVIDERS]
})
export class App implements OnInit{
    message:string = 'hello';
    movies:Array<Movie>=[];

    constructor(private _service:ObservableService){

        this._service.findMovies().subscribe(
            (data)=>{

                data.forEach((movie,index)=>{
                   this.movies.push(movie);
                });
            },
            (error)=>{
                this.message='error';
            },
            ()=>{
                this.message='done';
            }
        );
    }

    ngOnInit():any {
        return undefined;
    }
}
