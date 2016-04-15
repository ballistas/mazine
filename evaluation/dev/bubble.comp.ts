/**
 * Created by pat on 26.03.16.
 */

import * as NG from "angular2/core";
import * as AN from "angular2/animate";
import * as RX from "rxjs/RX";

@NG.Component({
    selector:'[bubble-comp]',
    changeDetection: NG.ChangeDetectionStrategy.OnPush,
    template:`
        <div>{{message.content}}</div>
    `
})
export class BubbleComponent{
    private _show:AN.CssAnimationBuilder;
    private _discard:AN.CssAnimationBuilder;

    @NG.Input('message')
    public message:MessageIF;

    @NG.Input('monitor')
    private callback:StateCallbackIF;
    state:State=State.INIT;

    constructor(
        public _detector:NG.ChangeDetectorRef,
        private _animBuilder:AN.AnimationBuilder,
        private _element:NG.ElementRef){

    }

    public show():AN.Animation{

        this.state=State.SHOWING;

        this.callback.stateChange(
            this,
            State.INIT,
            State.SHOWING
        );

        return this._show.start(
            this._element.nativeElement
        ).onComplete(()=>{

            this.state=State.VISIBLE;

            this.callback.stateChange(
                this,
                State.SHOWING,
                State.VISIBLE
            );

        });
    }

    public hide():AN.Animation{

        this.state = State.HIDING;

        this.callback.stateChange(
            this,
            State.VISIBLE,
            State.HIDING
        );

        return this._discard.start(
            this._element.nativeElement
        ).onComplete(()=>{
            this.state=State.HIDDDEN;

            this.callback.stateChange(
                this,
                State.HIDING,
                State.HIDDDEN
            );
        });
    }


    ngOnInit(){

        this._show = this.buildShow();
        this._discard = this.buildDiscard();
    }

    public getElement():NG.ElementRef{

        return this._element;
    }

    private buildShow():AN.CssAnimationBuilder{

        let builder = this._animBuilder.css()
            .setDuration(1000)
            .setFromStyles({
                opacity:0.5,
                transform:"translate(100px,0px)"
            })
            .setToStyles({
                opacity:1,
                transform:"translate(0px,0px)"
            }).addClass('visible');

        return builder;
    }

    private buildDiscard(){

        let builder = this._animBuilder.css()
            //.setDelay(250)
            .setDuration(1000)
            .setFromStyles({
                opacity:1,
                transform:"translate(0px,0px)"
            })
            .setToStyles({
                opacity:0,
                transform:"translate(0px,100px)"
            }).removeClass('visible');

        return builder;
    }
}

export enum State{
    INIT,
    SHOWING,
    VISIBLE,
    HIDING,
    HIDDDEN

}

//evtl. auch ueber Observer-Pattern
export interface StateCallbackIF{

    stateChange(
        bubble:BubbleComponent,
        from:State,
        to:State
    ):void;
}

export interface MessageIF{
    content:string;
}