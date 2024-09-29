import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { compareCourses, Course } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { AllCoursesLoaded } from "../course.actions";


export interface CourseState extends EntityState<Course>{
   allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    //selectId: course => course.courseId for when the key id is not named id instead its names something else. ngrx expects us to name it id
});

export const initialCoursesState = adapter.getInitialState({ allCoursesLoaded: false});

export const CoursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.AllCoursesLoaded, (state, action) => adapter.addMany(action.courses, {...state, allCoursesLoaded: true})),
    on(CourseActions.courseUpdated, (state, action) => adapter.updateOne(action.update, state)) //in memory update
)

export const { selectAll } = adapter.getSelectors(); //exports only  the selectAll property or method 
