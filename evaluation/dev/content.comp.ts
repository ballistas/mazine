/**
 * Created by pat on 26.03.16.
 */

import * as AN from "angular2/animate";
import * as NG from "angular2/core";
import {clickAll} from "angular2/src/testing/e2e_util";

@NG.Directive({
    selector:'[content-cmp]',
    exportAs:'cc'
})
export class ContentComponent implements NG.OnInit{

    private _show:AN.CssAnimationBuilder;
    private _discard:AN.CssAnimationBuilder;

    constructor(
        private _animBuilder:AN.AnimationBuilder,
        private _element:NG.ElementRef){

    }

    private toggle(){

        console.log('and action!');

        this._discard.start(
            this._element.nativeElement
        )
    }

    ngOnInit(){

        this._show = this.buildShow();
        this._discard = this.buildDiscard();
    }

    private buildShow():AN.CssAnimationBuilder{

        let builder = this._animBuilder.css()
            .setDuration(1000)
            .setFromStyles({
                opacity:0.5,
                transform:"translate(0px,-100px)"
            })
            .setToStyles({
                opacity:1,
                transform:"translate(0px,0px)"
            }).addClass('visible');

        return builder;
    }

    private buildDiscard(){

        let builder = this._animBuilder.css()
            .setDelay(250)
            .setDuration(1000)
            .setFromStyles({
                opacity:1,
                transform:"translate(0px,0px)"
            })
            .setToStyles({
                opacity:0,
                transform:"translate(0px,-100px)"
            }).removeClass('visible');

        return builder;
    }
}
