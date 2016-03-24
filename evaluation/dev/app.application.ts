///<reference path="../node_modules/angular2/typings/browser.d.ts" />
///<reference path="../node_modules/zone.js/dist/zone.js.d.ts" />
///<reference path='../typings/youtube/youtube.d.ts' />

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import {
    Component,
    OnInit
} from "angular2/core";
import {HTTP_PROVIDERS} from 'angular2/http';
import {ObservableService} from "./observable.service.demo";
import {Movie} from "./movie.domain";
import {YoubeAPILoader} from "./youtube.api.service";
import {YTAPI} from "./ytapi.factory";
import {VideoComponent} from "./video.component";
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
    <video-comp ident="rhwaxOK1WX4"></video-comp>
    `,
    providers:[ObservableService,HTTP_PROVIDERS,YTAPI],
    directives:[VideoComponent]
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


    ngOnInit(){
    /*
        this._api.getPlayer().subscribe(
            (player)=>{
                console.log(
                    `player create#1: ${player}`
                );
            }
        );

        this._api.getPlayer().subscribe(
            (player)=>{
                console.log(
                    `player create#3: ${player}`
                );
            }
        );

        setTimeout(() => {
            this._api.getPlayer('my video').subscribe(
                (player)=>{
                    console.log(
                        `player create#2: ${player}`
                    );
                }
            );
        },3000);
        */
    }

}
