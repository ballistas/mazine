/**
 * Created by pakunert on 25.04.2016.
 */

import * as user from './user.domain';

export class Script{

    constructor(
        private _author:Author
    ){}
}

/**
 * writes a script
 */
export class Author{
    constructor(
        private _profile:user.Profile
    ){}
}
