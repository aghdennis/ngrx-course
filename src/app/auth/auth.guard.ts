import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { select, Store } from "@ngrx/store";
import { AuthState } from "./reducers";
import { isLoggedIn } from "./auth.selector";
import { tap } from "rxjs/operators";


export const AuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
 
  let stateStoreService: Store<AuthState> = inject(Store<AuthState>);
  let router: Router = inject(Router);
  
  return stateStoreService.pipe(
    select(isLoggedIn),
    tap(isloggedInBoolean => {     
        if(!isloggedInBoolean){
            router.navigateByUrl('/login');
        }        
    }));
};