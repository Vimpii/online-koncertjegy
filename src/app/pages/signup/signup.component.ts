import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(private location: Location, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.signUpForm.value);
    if (
      this.signUpForm.get('email') !== null &&
      this.signUpForm.get('password') !== null &&
      this.signUpForm.get('confirmPassword') !== null
    ) {
      this.authService
        .signup(
          this.signUpForm.get('email')?.value || '',
          this.signUpForm.get('password')?.value || ''
        )
        .then((cred) => {
          console.log(cred);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
  goBack() {
    this.location.back();
  }
}
