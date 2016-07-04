/**
 * Created by pakunert on 25.04.2016.
 */
import * as ngcore from '@angular/core';
import * as nghttp from '@angular/http';
import * as rxjs from 'rxjs';

export class Profile{

    constructor(
        public surname:string,
        public firstname:string,
        public account:string
    ){

        
    };
    
    
};

export interface ProfileServiceIF{

    find(filter?:(profile:Profile)=>boolean):rxjs.Observable<Profile[]>;
}

@ngcore.Injectable()
export class ProfileService implements ProfileServiceIF{

    constructor(private _http:nghttp.Http){}

    find(filter?:(profile:Profile)=>boolean):rxjs.Observable<Profile> {

        return this._http.get(
            'data/profiles.json'

        ).flatMap((response)=>{

            return response.json();
        }).filter(
            (result:Profile)=>{
                return filter(result);
            }
        );
    }

}


