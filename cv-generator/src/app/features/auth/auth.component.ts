import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { Actions } from '@ngrx/effects';
import { Subject, filter, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, NgClass, NgIf, RouterLink],
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
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Redirect between login and signup
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => (this.isSignup = data['isSignup']));
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
}
