import {Observable} from "rxjs/Observable";
/**
 * Created by pakunert on 17.03.2016.
 */

class ObservableDemo{

    $values:Observable<Array<string>>;
    private values:Array<string> = [];

    constructor(){

        this.$values=new Observable((observer)=>{

            setTimeout(()=>{

                    observer.next('value 1');
                    observer.next('value 3');
                    observer.complete();
                },
                1000
            )
        });
    }
}

let demo = new ObservableDemo();
let topic = demo.$values.subscribe(
    (value)=>{console.log('success ${value}')},
    (value)=>{console.log('error ${value}')},
    ()=>{
        console.log('unsubscribe ${value}');
        topic.unsubscribe();
    }
);

