import { isDevMode } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  State
} from '@ngrx/store';


export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
 //keys are the state values in our store. 
    router: routerReducer

};

export function loggerMetaReducer(reducer: ActionReducer<any>): ActionReducer<any>
{ 
   return (state, action) => {   
    return reducer(state, action); //continues the next reducer in the chain
   }
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [loggerMetaReducer] : [];
