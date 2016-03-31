/**
 * Created by pakunert on 23.03.2016.
 */
import {
    Component,
    Input,
    Output,
    OnInit,
    EventEmitter
} from 'angular2/core';

import * as RX from "rxjs/Rx";

import {YTAPI} from "./ytapi.factory";
import {Observable} from "rxjs/Observable";
import DateTimeFormat = Intl.DateTimeFormat;
import PlayerState = YT.PlayerState;

@Component({
    selector:'video-comp',
    template:`
        <div id='{{video}}'></div>
    `
})
export class VideoComponent implements OnInit{

    @Input('ident')
    private video:string;

    private seconds:number = 0;

    private keys = [
        {at:4,payload:'Welcome!!'},
        {at:11,payload:'Nice Coffee!!!'},
        {at:19,payload:'Yummy Hashbrowns [LINK]'},
        {at:26,payload:'Lets ROLL!!!'}
]   ;
    private player:YT.Player;

    @Output('key')
    private $keys:EventEmitter<{at:number,payload:any}> = new EventEmitter();

    private $timer:RX.Observable<{at:number,payload:any}> = RX.Observable.timer(0,1000)
        .filter(()=>{

            return this.player.getPlayerState()===YT.PlayerState.PLAYING;

        }).do(()=>{
            this.seconds++;
        }).map(()=>{

            let key = null;

            for(let idx=0;idx < this.keys.length;idx++){
                if(this.seconds == this.keys[idx].at){
                    key = this.keys[idx];
                    break;
                }
            }

            return key;
        }).merge(
            RX.Observable.fromEvent(
                window,
                'yt.control',
                ()=>{

                    let key = null;

                    this.seconds = Math.round(this.player.getCurrentTime());

                    //we wanna show message right before current time
                    for(let idx=0;idx < this.keys.length;idx++){
                        if(this.seconds < this.keys[idx].at){
                            break;
                        }

                        key = this.keys[idx];
                    }

                    return key;
                }
            )
        ).filter((key)=>{
            return key!=null;
        }).distinctUntilChanged((key1,key2)=>{
            return key1.at==key2.at;
        });

    constructor(private _api:YTAPI){

    }

    ngOnInit(){

        this._api.getPlayer(
            this.video,{
                onReady:(event)=>{

                    this.$timer.subscribe(
                        (key)=>{
                            console.log(`emit ${key.payload}`);
                            this.$keys.emit(
                                key
                            );
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
