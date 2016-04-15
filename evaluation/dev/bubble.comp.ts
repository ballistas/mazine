/**
 * Created by pat on 26.03.16.
 */

import * as NG from "angular2/core";
import * as AN from "angular2/animate";

@NG.Component({
    selector:'[bubble-comp]',
    template:`
        <div>{{message.content}} {{message.state}}</div>
        
    `
})
export class BubbleComponent{
    private _show:AN.CssAnimationBuilder;
    private _discard:AN.CssAnimationBuilder;

    @NG.Input('message')
    private message:Message;

    @NG.Input('index')
    private index:number;

    state:State=State.INIT;

    constructor(
        private _animBuilder:AN.AnimationBuilder,
        private _element:NG.ElementRef){

    }

    public show():AN.Animation{

        this.state=State.SHOWING;

        return this._show.start(
            this._element.nativeElement
        ).onComplete(()=>{
            console.log('show done state==VISIBLE');
            this.state=State.VISIBLE;
        });
    }

    public hide():AN.Animation{

        this.state = State.HIDING;

        return this._discard.start(
            this._element.nativeElement
        ).onComplete(()=>{
            console.log('hide done state==HIDDEN');
            this.state=State.HIDDDEN;
        });
    }


    ngOnInit(){

        this._show = this.buildShow();
        this._discard = this.buildDiscard();
    }

    private buildShow():AN.CssAnimationBuilder{

        let builder = this._animBuilder.css()
            .setDuration(1000)
            .setFromStyles({
                opacity:0,
                transform:"translate(-200px,0px)"
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
                transform:"translate(200px,0px)"
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

export class Message{
    public content:string;
    public state:State;
}

