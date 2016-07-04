/**
 * Created by pakunert on 25.04.2016.
 */

import * as angular from '@angular/core';
import * as user from './user.domain';
import * as rxjs from 'rxjs/RX';

/**
 * written by author
 */
export class Script{

    constructor(
        private _author:Author
    ){}
}

/**
 * has a user profile
 */
export class Author{
    constructor(
        private _profile:user.Profile
    ){}
}

export interface ScriptServiceIF{

    find():Array<Script>
}

@angular.Injectable()
export class ScriptService implements ScriptServiceIF{

    find():Array<Script> {

        let profile:user.Profile = new user.Profile();
        let author:Author = new Author(
            profile
        );

        return [
            new Script(author),
            new Script(author),
            new Script(author)
        ];
    }


}
