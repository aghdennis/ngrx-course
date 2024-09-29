import { createAction, props } from "@ngrx/store"
import { User } from "./model/user.model"

//This is an action
export const login = createAction(
    "[Login Page] User Login",
    props<{user: User}>()
);

//Export the action
export const logout = createAction("[Top Menu] Logout");