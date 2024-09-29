import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

//should not be injected anywhere in the code.
//used internally by ngrx
@Injectable()
export class AuthEffects {

    loginObservable$ = createEffect(() =>  
        this.action$
        .pipe(
            ofType(AuthActions.login),
            tap(action => {
                localStorage.setItem('user', JSON.stringify(action.user));
            })
        ),  { dispatch: false});  //could accidentally create infinite loop. Many side effects result in a dispatch actions normally


        logoutObservable$ = createEffect(() => 
            this.action$
            .pipe(
                ofType(AuthActions.logout),
                tap(action => {
                    localStorage.removeItem('user');

                    this.router.navigateByUrl('/login');
                })), { dispatch: false}
        );

    constructor(private action$: Actions, private router:Router){      
    }           
    
}