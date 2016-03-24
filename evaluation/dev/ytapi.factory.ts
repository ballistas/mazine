
/**
 * Created by pakunert on 23.03.2016.
 */

import {
    Injectable
} from 'angular2/core';


import * as RX from 'rxjs/Rx';

declare interface Factory{
    create(
        video:string,
        delegate:YT.Events
    ):any;
}

@Injectable()
export class YTAPI{
    factory:Factory;

    $factory:RX.Observable<Factory> = RX.Observable.fromEvent(
        window,
        'yt.apiready',
        ()=>{

            this.factory = {
                create:function(
                    video:string,
                    delegate:YT.Events
                ){
                    return new YT.Player(
                        video, {
                        height: '195',
                        width: '320',
                        videoId: video,
                        events:delegate
                    });
                }
            };

            return this.factory;
        }
    ).merge( RX.Observable.create(
        (subscriber)=>{
            subscriber.next(this.factory);
            subscriber.complete();
        })
    ).filter(
        (factory:{create:(string)=>any})=>{
            return typeof factory !== 'undefined';
        }
    );

    constructor(){


        console.log('load api...');

        window['onYouTubeIframeAPIReady']=()=>{

            window.dispatchEvent(
                new Event('yt.apiready')
            );
        };

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    getPlayer(video:string,delegate:YT.Events):RX.Observable<YT.Player>{

        return this.$factory.map((factory)=>{
            return factory.create(
                video,
                delegate
            );
        });
    }
}
