/**
 * Created by pakunert on 23.03.2016.
 */
import {
    Component,
    Input,
    OnInit
} from 'angular2/core';

import * as RX from "rxjs/Rx";

import {YTAPI} from "./ytapi.factory";
import {Observable} from "rxjs/Observable";
import DateTimeFormat = Intl.DateTimeFormat;
import PlayerState = YT.PlayerState;

@Component({
    selector:'video-comp',
    template:`
        <div>

            {{seconds}} , Msg: <b *ngIf="msg">{{msg.payload}}</b>
        </div>
        <div id='{{video}}'></div>
        <button *ngIf="player" (click)="playVideo()">play</button>
        
    `
})
export class VideoComponent implements OnInit{
    @Input('ident')
    private video:string;

    private player:YT.Player;
    private msg:{payload:string};
    private seconds:number;

    private $timer:RX.Observable<{at:number,payload:any}> = RX.Observable.timer(0,1000)
        .filter(()=>{

            return this.player.getPlayerState()===YT.PlayerState.PLAYING;

        }).map((second)=>{

            this.seconds++;

            let keys = [
                {at:4,payload:'Welcome!!'},
                {at:11,payload:'Nice Coffee!!!'},
                {at:19,payload:'Yummy Hashbrowns [LINK]'},
                {at:26,payload:'Lets ROLL!!!'}
            ];

            for(let idx=0;idx < keys.length;idx++){
                if(this.seconds==keys[idx].at){
                    return keys[idx];
                }
            }

            return null;
        }).filter((key)=>{
            return key!=null;
        });

    constructor(private _api:YTAPI){

    }

    ngOnInit(){

        this._api.getPlayer(
            this.video,{
                onReady:(event)=>{

                    this.$timer.subscribe(
                        (value)=>{
                            this.msg=value;
                        }
                    );
                    event.target.playVideo();
                },
                onStateChange:(event)=>{
                    console.log(`change : ${event.data}`);

                    switch(event.data){
                        case YT.PlayerState.PLAYING:
                            console.log(`state change: ${event.data} ,now Continue...`);
                            this.seconds=Math.round(
                                event.target.getCurrentTime()
                            );
                            break;
                        default:
                            console.log(`state change: ${event.data}, Default @ ${event.target.getCurrentTime()}`);
                    }
                }
            }
        ).subscribe(
            (player)=>{

                this.player=player;
            }
        )
    }
}
