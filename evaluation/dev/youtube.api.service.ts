/**
 * Created by pakunert on 21.03.2016.
 */

import {Injectable} from 'angular2/core';
import {
    Observable,
    Subscriber
} from 'rxjs/Rx';

@Injectable()
export class YoubeAPILoader{

    private _ready:boolean = false;

    constructor(){

        window['callback']=()=>{

            console.log('api ready...');
            this._ready=true;
        };

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }

    /**
     * wir kuemmern uns nicht darum, wann die API geladen ist und warten nicht auf einen
     * Player. Der Service wartet
     * @param video
     */
    public createPlayer(video:{url:string, player:string}):Observable<String>{

        return Observable.create((subscriber:Subscriber<String>)=>{
            if(!this._ready){
                subscriber.error('YT.API not ready')
            }

            subscriber.next(`Ready ${video.url}`);
            subscriber.complete();
        });
    }
}

export interface PlayerRef{

}