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

    private keys = [
        {at:4,payload:'Welcome!!'},
        {at:11,payload:'Nice Coffee!!!'},
        {at:19,payload:'Yummy Hashbrowns [LINK]'},
        {at:26,payload:'Lets ROLL!!!'}
]   ;
    private player:YT.Player;
    private msg:{payload:string};
    private seconds:number = 0;

    private $messenger = RX.Observable.fromEvent(
        window,
        'yt.control',
        ()=>{
            let result = {
                current:Math.floor(this.player.getCurrentTime()),
                message:{
                    payload:'void'
                }
            };

            //we wanna show message right before current time
            for(let idx=0;idx < this.keys.length;idx++){
                if(result.current > this.keys[idx].at){
                    result.message = this.keys[idx];
                }
            }

            return result;
        }
    ).subscribe(
        (control)=>{
            this.seconds = control.current;
            this.msg = control.message;
        }
    );

    private $timer:RX.Observable<{at:number,payload:any}> = RX.Observable.timer(0,1000)
        .filter(()=>{

            return this.player.getPlayerState()===YT.PlayerState.PLAYING;

        }).map((second)=>{

            this.seconds++;

            for(let idx=0;idx < this.keys.length;idx++){
                if(this.seconds==this.keys[idx].at){
                    return this.keys[idx];
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
                    window.dispatchEvent(
                        new Event('yt.control')
                    );
                    switch(event.data){
                        case YT.PlayerState.PLAYING:
                            console.log(`state change: ${event.data} ,now Continue...`);

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
