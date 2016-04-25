/**
 * Created by pakunert on 25.04.2016.
 */

import * as NG from "angular2/core";

@NG.Component({
    selector:'app-cmp',
    template:`
        <h2>application</h2>
    `,
    directives:[]
})
export class App implements NG.OnInit{

    public ngOnInit(){

    }
}