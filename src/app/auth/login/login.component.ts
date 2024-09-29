import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import { AppState } from '../../reducers';
import { AuthActions } from '../action-types';
import { AuthState } from '../reducers';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private ngrxStore:Store<AuthState>,
      private router:Router) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {

    let email = this.form.get('email').value;
    let password  = this.form.get('password').value;

    this.auth.login(email, password)
    .pipe(
      tap(user => {
         console.log("creatign a side effect using the rxjs tap operator" , user);
         //here save user
         this.ngrxStore.dispatch(AuthActions.login({user}));
         this.router.navigateByUrl('/courses');
      })
    )
    .subscribe({
      next() {
        noop();
      },

      error() {
        alert("Login Failed for User");
      },

      complete() {
        console.log('subscription is completed');
      }
    })
  }

}

