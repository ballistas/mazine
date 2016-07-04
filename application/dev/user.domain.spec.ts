/**
 * Created by pat on 29.06.16.
 */

///<reference path="../typings/jasmine/jasmine" />

import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";

import {
    beforeEach,
    beforeEachProviders,
    afterEach,
    describe,
    expect,
    it,
    inject
} from "@angular/core/testing";
import * as nghttp from '@angular/http';
import * as nghttpmock from '@angular/http/testing';

import * as user from "./user.domain";
import {Profile} from "./user.domain";

describe('ProfileService',()=>{

    let service;
    let backend:nghttpmock.MockBackend;

    beforeEachProviders(()=>[
        user.ProfileService,
        nghttp.HTTP_PROVIDERS,
        nghttpmock.MockBackend,
        {
            provide: nghttp.XHRBackend,
            useExisting: nghttpmock.MockBackend
        }
    ]);

    beforeEach(inject([user.ProfileService,nghttpmock.MockBackend],(ser,back)=>{

        service = ser;
        backend = back;
    }));

    it('should return 1 profile',()=>{


        backend.connections.subscribe((connection)=>{

            connection.mockRespond(new nghttp.Response(
                new nghttp.ResponseOptions({
                body:JSON.stringify(
                    [
                        new Profile('pass','vorname','account'),
                        new Profile('pass','vorname','account')
                    ]
                ), status:200
            })));
        });

        let result = service.find((profile:Profile)=>{
            
            return profile.surname==='pass';
        });

        expect(result.length).toEqual(1);
    });
});
