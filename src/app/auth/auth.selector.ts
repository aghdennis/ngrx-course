import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";


export const authFeatureStateSelector = createFeatureSelector<AuthState>("auth")

//memorized function keeps tracks of changes and executes only when there has been a change
export const isLoggedIn = createSelector(
    //fetch the data needed from the stotre. Can take as many functions before the projector function
    authFeatureStateSelector,
    (authState) => !!authState.user //a function that takes in the 
)

export const isLoggedOut = createSelector(
    //fetch the data needed from the stotre. Can take as many functions before the projector function
    isLoggedIn,
    (valueFromAbove) => !valueFromAbove //Projector function 
)