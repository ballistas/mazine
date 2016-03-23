/**
 * Created by pakunert on 23.03.2016.
 */
import {
    Component,
    Input,
    OnInit
} from 'angular2/core';
import {YTAPI} from "./ytapi.factory";

@Component({
    selector:'video-comp',
    template:`
        <div>{{video}}</div>
        <div id='{{video}}'></div>
        <button *ngIf="player" (click)="playVideo()">play</button>
    `
})
export class VideoComponent implements OnInit{
    @Input('ident')
    private video:string;

    private player:any;

    constructor(private _api:YTAPI){

    }

    playVideo(){
        console.log('play');
        this.player.playVideo();
    }

    ngOnInit(){

        this._api.getPlayer(
            this.video
        ).subscribe(
            (player)=>{

                this.player=player;
            }
        )
    }
}
