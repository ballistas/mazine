import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";

import {Movie} from "./movie.domain";
import {Http} from "angular2/http";
import {OnInit} from "angular2/core";

/**
 * Created by pakunert on 17.03.2016.
 */

@Injectable()
export class ObservableService implements ObservableServiceIF{

    constructor(private _http:Http){

    }

    findMovies():Observable<Array<Movie>> {

        return this._http.get(
            'data/movies.json'
        ).map((result)=>result.json()
        ).do((result)=>{
            console.log(result);
        });
    }
}

export interface ObservableServiceIF{

    findMovies():Observable<Array<Movie>>;
}