

//load the data into the store anad keeo it there

import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

//courses resolver that will load the courses from the backend

export const loadAllCourses = createAction(
    "[Courses Resolver] Load All Courses",
);

//An effect should trigger this action
export const AllCoursesLoaded = createAction(
    "[Load Courses Effect] All Courses Loaded",
    props<{courses: Course[]}>()
);

export const courseUpdated = createAction(
    "[Edit Course] Course Updated",
    props<{update: Update<Course>}>()
)