import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";
import { concatMap, map } from "rxjs/operators";

@Injectable()
export class CoursesEffect {

    loadAllCourses$ = createEffect(
        () => this.action$.pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action => this.courseHttpService.findAllCourses()), //only send one request at a time to the backend
            map(courses => CourseActions.AllCoursesLoaded({courses})), //maps the result back into an action that will be dispatched back tot he store 
            //previously we did not require any dispatches back to the store hence dispatch : false
           
        )
    );

    saveCourse$ = createEffect(
        () => this.action$.pipe(
            ofType(CourseActions.courseUpdated),
            concatMap(action => this.courseHttpService.saveCourse(action.update.id, action.update.changes))
        ), {dispatch: false}) ; //not resulting in the dispatch of a new action hence this code

     constructor(private action$: Actions, private courseHttpService: CoursesHttpService ){
    }
}