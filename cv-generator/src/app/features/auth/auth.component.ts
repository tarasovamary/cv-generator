import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';
import * as AuthActions from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, NgClass, NgIf, RouterLink, AsyncPipe],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit, OnDestroy {
  isSignup: boolean = false;
  loginForm!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actions$: Actions,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Redirect between login and signup
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => (this.isSignup = data['isSignup']));

    // Handle login failure
    this.onLoginFailure();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.isSignup) {
        this.store.dispatch(AuthActions.signup({ email, password }));
      } else {
        this.store.dispatch(AuthActions.login({ email, password }));
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onLoginFailure(): void {
    this.actions$.pipe(ofType(AuthActions.loginFailure), takeUntil(this.destroy$)).subscribe(({ error }) => {
      alert(error);
    });
  }
}
