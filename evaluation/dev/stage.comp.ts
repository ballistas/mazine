/**
 * Created by pakunert on 24.03.2016.
 */

import * as NG from 'angular2/core';
import * as RX from 'rxjs/Rx';
import {VideoComponent} from "./video.component";
import {ContentComponent} from "./content.comp";
import {BubbleComponent, State} from "./bubble.comp";

@NG.Component({
    selector:'stage',
    template:`
        <div>
            <h3>Stage</h3>
            <!--video-comp (key)="show($event)" ident="rhwaxOK1WX4"></video-comp-->
            <div bubble-comp *ngFor="#message of messages" [content]="message">
            </div>            
        </div>
    `,
    directives:[VideoComponent,ContentComponent,BubbleComponent]
})
export class StageComponent implements NG.OnInit{
    @NG.ViewChildren(BubbleComponent)
    private _bubblesNew:NG.QueryList<BubbleComponent>;
    private $pusher:RX.Observable<string> = RX.Observable.timer(2000, 1000)
        .map((index)=>{
            return `Message ${index}`;
        });

    messages:Array<string>=[];

    constructor(){
     }

    ngAfterViewInit(){
        //in and out
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
                bubble.hide().onComplete(()=> {
                    this.messages.pop();
                });

            }
        });

        this.$pusher.subscribe(
            (message)=>{
                console.log(`${message} ${this.messages.length}`);
                this.messages.push(`${message} ${this.messages.length}`);
            },
            (error)=>{
                console.log(`${error}`);
            }
        );
    }

    ngOnInit(){


    }

    show(event){
        //simply pushing data
        this.messages.push(
            event.payload
        );
    }


}
