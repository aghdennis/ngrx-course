import {
  createReducer,
  on} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
 user: User;
}

export const initialAuthState: AuthState = {
  user : undefined
}

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.login, (state, action) => {
      //do soemthing with the state
      console.log("the initial state ", state);

      //do something with the action
      console.log("current action ", action);
       return { user: action.user }
      }),

      on(AuthActions.logout, (state, action) => {

        //return state object
        return {
          user: initialAuthState.user
        }
      })
);





