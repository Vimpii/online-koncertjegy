import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

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

  constructor(
    private location: Location,
    private authService: AuthService,
    private userService: UserService
  ) {}

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
