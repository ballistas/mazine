/**
 * Created by pakunert on 07.04.2016.
 */

import * as RX from "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import * as IMM from "immutable";
import Scene = domain.Scene;

/*
 * stick to Domain-Driven Design
 * * core domain@App/Module Level
 */
module domain{
    /**
    * a Performance is presented at a Stage. Depending on the Scene-Setting,
    * Roles (abstract) / Actors (real) will enter, act and leav the stage.
    */
    export class Stage{

        private performance:Performance;

        /**
         * the Stage is occupied, if a Performance is
         * staged and the Performance is running
         *
         * @returns {any}
         */
        public isOccupied():boolean{

            return this.performance
                && this.performance.isRunning();
        }
    }

    export class Play{

        public performAt(stage:Stage):Performance{

            return null;
        }
    }

    /**
     * an act has at least 1 scene. Its duration is based on the sum of all scene's
     * duration.
     */
    export class Act{
        //has scenes

    }

    export class Scene{

        public action(role:Role,at:number):void{

        }
    }


    export class DSLdemo{

        public dsl(){

            let scene = new Scene();

            let Factory.Actor = scene.role('producer')
                .act((scene,role)=>{

                    scene.event(
                        Scene.Start,
                        role,
                        (performance,event,role)=>{

                            role.enter(
                                performance
                            );
                        }
                    );

                    //Event play
                    scene.event(
                        Scene.End,
                        role,
                        (performance,event,role)=>{

                            role.leave(
                                performance
                            );
                        }
                    );
                    //Timed-play
                    scene.at(
                        10,
                        role,
                        (performance,event,role)=>{

                            role.message(
                              'what da fuck, that makes sense'
                            );

                            role.message({
                                key:'1234',
                                type:Type.CONTENT
                            });
                        }
                    );

                    //Dependend play, may be implemented as general hooks for actor
                    scene.when(role,(performance,role)=>{

                        //rather if, no -- faster with observers
                        performance.onPause(role,(performance,role)=>{

                            let actor = performance.actorFor(role);

                            actor.pause();
                        });

                        performance.onStop(role,(performance,role)=>{

                            let actor = performance.actorFor(role);

                            actor.stop();
                        });

                        performance.onPlay(role,(performance,role)=>{

                            let actor = performance.actorFor(role);

                            actor.play();
                        });

                    });
                });


            scene1.role('consumer')
                .act((performance,role)=>{

                    role.listen('producer')
                        .messages((message)=>{
                            return message;
                        })
                        .do((role,message)=>{

                            role.message(message)
                        });

                });

            let performance:Perfomance = scene.performOn(
                new Stage()
            ).cast('publisher'  ,VideoComponent
            ).cast('consumer'   ,MessageComponent);
        }
    }

    /**
     * a role is performed by an actor, who's skills are matching.
     *
     * A Role represents the abstract need, whereas the actor performs
     * the role in a Plays physical performance.
     *
     * e.g.
     *
     * A role may require a Video-Skill. It will enter the stage in Scene 2 of Act 2, @30 seconds
     * from scene start.
     *
     * It is up to the play to decide, which actor has the skills, and is not currently playing. So, a
     * video-component (as an actor), may have the skill to show a video.
     *
     *
     */
    export class Role{

        public performIn(scene:Scene):Action{

            return scene.action(
                Action.Enter
            );
        }

        public requires():Skill[]{

            return [Skill.PLAYVIDEO];
        }
    }


    /**
     * an sctor plays a defined role in a play. Based on his skills, and his availabilty
     * actors can play enoumerous Roles in a Play (reusing of Actors). An Actor can only play 1
     * Role in a scene, at a timespan defined by the Scene.
     */
    export class Actor{

    }

    export enum Skill{
        PLAYVIDEO,
        PLAYIMAGES
    }

    export class Performance{

        public  isRunning():boolean{

            return false;
        }
    }


}
