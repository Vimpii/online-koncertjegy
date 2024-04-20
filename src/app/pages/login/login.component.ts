import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService
      .login(this.email.value || '', this.password.value || '')
      .then((cred) => {
        alert('Login successful');
        this.router.navigateByUrl('/main');
      })
      .catch((err) => {
        console.error(err);
        alert('Login failed');
      });
  }
}
