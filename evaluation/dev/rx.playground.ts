import * as rx from "rxjs";

var source = rx.Observable.timer(2000,1000)
    .do((x)=>{
        console.log(`do ${x}`);
    })
    .take(3);

source.subscribe(
    (x)=>{console.log(`timer ${x}`)},
    (error)=>console.log(`error ${error}`),
    ()=>console.log('complete')
)

var subject = new rx.AsyncSubject();

var i = 0;
var handle = setInterval(function () {
    subject.next(i);
    if (++i > 3) {
        subject.complete();
        clearInterval(handle);
    }
}, 500);

var subscription = subject.subscribe(
    function (x) {
        console.log('Next: ' + x.toString());
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });