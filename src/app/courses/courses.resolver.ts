import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { filter, finalize, first, tap } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { areCoursesLoaded } from "./courses.selectors";

//A Router resolver waits for the data to be resolved before effecting the navigation
export const CourseResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    let loading = false;

    let store: Store<AppState> = inject(Store<AppState>);

    return store.pipe(
        select(areCoursesLoaded),
        tap((coursesLoaded) => {
            if(!loading && !coursesLoaded){
                loading = true;
                store.dispatch(CourseActions.loadAllCourses())
            }
        }),
        filter(coursesLoaded => coursesLoaded), //when the courses are set to true then it means the courses have been loaded whihc means the observable needs terminating
        first(), //ensures observable emits a single value and then completes else there will be hanging if no completion
        finalize(() => loading = false)
    )
} 