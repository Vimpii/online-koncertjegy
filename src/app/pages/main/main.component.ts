import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  username: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user !== null) {
        this.userService.getById(user.uid).subscribe((currentUser) => {
          if (currentUser === undefined) {
            return;
          }
          this.username = currentUser.username;
        });
      }
    });
  }
}
