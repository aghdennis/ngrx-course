import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selector';
import { AuthActions } from './auth/action-types';
import { AuthState } from './auth/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private ngrxStore: Store<AuthState>) {
    }

    ngOnInit() {

      //we still need to store state on the browser for when the browser gets refreshed because 
      //NGRX does not maintain state between refreshes on the browser.

      let userProfile = localStorage.getItem('user');

      if(userProfile){
        //there is a lifecylce as a result of this call that needs to be properly understood
        this.ngrxStore.dispatch(AuthActions.login({ user : JSON.parse(userProfile)}));
      }

      console.log("Firing ng on init in the app component");

    this.isLoggedIn$ = this.ngrxStore.pipe( 
      select(isLoggedIn) //selectors are used to query the state store in an efficient manner
     );

     this.isLoggedOut$ = this.ngrxStore.pipe(
      select(isLoggedOut) //a way that does not involve repeated and unnecessary access to the state store
     );

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });
    }

    logout() {
      this.ngrxStore.dispatch(AuthActions.logout());
    }
}
