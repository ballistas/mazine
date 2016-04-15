/**
 * Created by pakunert on 24.03.2016.
 */

import * as NG from 'angular2/core';
import * as RX from 'rxjs/Rx';
import {VideoComponent} from "./video.component";
import {ContentComponent} from "./content.comp";
import {BubbleComponent, State} from "./bubble.comp";
import {StateCallbackIF} from "./bubble.comp";
import {Observable} from "rxjs/Observable";
import {MessageIF} from "./bubble.comp";

@NG.Component({
    selector:'stage',
    //changeDetection: NG.ChangeDetectionStrategy.CheckAlways,
    template:`
        <div>
            <h3>Stage</h3>
            <!--video-comp (key)="show($event)" ident="rhwaxOK1WX4"></video-comp-->
            <div bubble-comp *ngFor="#message of messages" [message]="message" [monitor]="getMonitor()">
            </div>            
        </div>
    `,
    directives:[VideoComponent,ContentComponent,BubbleComponent]
})
export class StageComponent implements NG.OnInit,StateCallbackIF{
    private static PUSHER:RX.ConnectableObservable<string> = RX.Observable.timer(0,1000).map((index)=>{

        return `Message ${index}`;
    }).publish();

    @NG.ViewChildren(BubbleComponent)
    private _bubblesNew:NG.QueryList<BubbleComponent>;

    private messages:Array<MessageIF>=[];

    constructor(private _changeDetector:NG.ChangeDetectorRef){
    }


    stateChange(bubble:BubbleComponent, from:State, to:State):void {

        this._changeDetector.markForCheck();

        if(to===State.HIDDDEN){
            this.messages=this.messages.filter((candidate,index,source)=>{
                return bubble.message.content!=candidate.content;

            });
        }
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
                bubble.hide();
            }
        });
    }

    getMonitor():StateCallbackIF{

        return this;
    }

    ngOnInit(){

        StageComponent.PUSHER.connect();

        let that=this;

        StageComponent.PUSHER.subscribe((message)=>{

            that.messages = that.messages.concat({
                content:message
            }) ;

        });

    }

    show(event){
        //simply pushing data
        this.messages.push(
            event.payload
        );
    }


}
