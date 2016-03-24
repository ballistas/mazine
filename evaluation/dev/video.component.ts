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

            {{seconds}} , Msg: <b *ngIf="key">{{key.payload}}</b>
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
    private key:{payload:string};
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

            console.log(`event!!! ${result.current}`);

            //we wanna show message right before current time
            for(let idx=0;idx < this.keys.length;idx++){
                if(result.current < this.keys[idx].at){
                    break;
                }

                result.message = this.keys[idx];
            }

            return result;
        }
    ).subscribe(
        (control)=>{
            this.seconds = control.current;
            this.key = control.message;
        }
    );

    private $timer:RX.Observable<{at:number,payload:any}> = RX.Observable.timer(0,1000)
        .filter(()=>{

            return this.player.getPlayerState()===YT.PlayerState.PLAYING;

        }).map((second)=>{

            let key = null;

            for(let idx=0;idx < this.keys.length;idx++){
                if(this.seconds < this.keys[idx].at){
                    break;
                }

                key = this.keys[idx];
            }

            return key;
        }).do(()=>{
            this.seconds++;
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
                        (key)=>{
                            this.key = key;
                        }
                    );
                    event.target.playVideo();
                },
                onStateChange:(event)=>{
                    window.dispatchEvent(
                        new Event('yt.control')
                    );
                }
            }
        ).subscribe(
            (player)=>{

                this.player=player;
            }
        )
    }
}
