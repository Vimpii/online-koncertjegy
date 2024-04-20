import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private location: Location,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (
      this.signUpForm.get('password')?.value !==
      this.signUpForm.get('confirmPassword')?.value
    ) {
      alert('Passwords do not match');
      return;
    }
    if (this.signUpForm.valid) {
      this.authService
        .signup(
          this.signUpForm.get('email')?.value || '',
          this.signUpForm.get('password')?.value || ''
        )
        .then((cred) => {
          const user: User = {
            id: cred.user?.uid as string,
            email: this.signUpForm.get('email')?.value as string,
            username: this.signUpForm
              .get('email')
              ?.value?.split('@')[0] as string,
            tickets: [],
          };
          this.userService.create(user);
          alert('Signup successful');
          this.router.navigate(['/profile']);
        })
        .catch((err) => {
          console.error(err);
          if (err.code === 'auth/email-already-in-use') {
            alert('Email is already in use');
          }
        });
    } else {
      alert('Form is invalid');
    }
  }

  goBack() {
    this.location.back();
  }
}
