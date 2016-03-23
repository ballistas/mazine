/**
 * Created by pakunert on 23.03.2016.
 */
import {
    Injectable
} from 'angular2/core';


import * as RX from 'rxjs/Rx';

@Injectable()
export class YTAPI{
    factory:{create:(string)=>any};

    $factory:RX.Observable<{create:(string)=>any}> = RX.Observable.fromEvent(
        window,
        'yt.apiready',
        ()=>{

            this.factory = {
                create:function(video:string){
                    return new YT.Player(
                        video, {
                        height: '390',
                        width: '640',
                        videoId: video
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

    getPlayer(video:string='demo'):RX.Observable<string>{

        return this.$factory.map((factory:{create:(string)=>any})=>{
            return factory.create(
                video
            );
        });
    }
}
