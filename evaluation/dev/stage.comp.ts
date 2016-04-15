/**
 * Created by pakunert on 24.03.2016.
 */

import * as NG from 'angular2/core';
import * as RX from 'rxjs/Rx';
import {VideoComponent} from "./video.component";
import {ContentComponent} from "./content.comp";
import {BubbleComponent, State, Message} from "./bubble.comp";

@NG.Component({
    selector:'stage',
    template:`
        <div>
            <h3>Stage</h3>
            <!--video-comp (key)="show($event)" ident="rhwaxOK1WX4"></video-comp-->
            <div bubble-comp *ngFor="#message of messages" [message]="message">
            </div>            
        </div>
    `,
    directives:[VideoComponent,ContentComponent,BubbleComponent]
})
export class StageComponent implements NG.OnInit{
    @NG.ViewChildren(BubbleComponent)
    private _bubblesNew:NG.QueryList<BubbleComponent>;
    private $pusher:RX.Observable<string> = RX.Observable.timer(0, 1000)
        .map((index)=>{
            return `Message ${index}`;
        });

    messages:Array<Message>=[];

    constructor(){
     }

    ngAfterViewInit(){
        //in and out
        /*
         this._bubblesNew.changes.filter((query:NG.QueryList<BubbleComponent>)=>{

            return query.filter((bubble:BubbleComponent)=>{
                return bubble.state==State.VISIBLE
                    || bubble.state==State.INIT
            }).length >= 1;

        }).flatMap((query:NG.QueryList<BubbleComponent>)=>{
            return RX.Observable.fromArray(
                query.toArray()
            );
        }).filter((bubble:BubbleComponent)=>{
            return bubble.state===State.VISIBLE
               || bubble.state==State.INIT
        }).subscribe((bubble:BubbleComponent)=>{
            if(bubble.state==State.INIT) {
                bubble.show();
            }else{
                bubble.hide();

            }
        });*/
    }

    ngOnInit(){
        let that = this;

        this.$pusher.subscribe(
            (message)=>{

                that.messages.push({
                        state:State.INIT,
                        content:message
                });

                if(that.messages.length>=2){

                    that.messages[0].state=State.VISIBLE;
                }

            },
            (error)=>{
                console.log(`${error}`);
            }
        );
    }

    show(event){
        //simply pushing data
        this.messages.push({
            state:State.INIT,
            content:'Demo'
        });
    }


}
