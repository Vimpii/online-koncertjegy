import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TicketService } from '../../shared/services/ticket.service';
import { Ticket } from '../../shared/models/Ticket';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  currentUser: User | undefined;
  userTickets: Ticket[] = [];
  editProfileForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user !== null) {
        this.userService.getById(user.uid).subscribe((currentUser) => {
          if (currentUser === undefined) {
            return;
          }
          this.currentUser = currentUser;
          this.editProfileForm.patchValue({
            email: currentUser.email,
            username: currentUser.username,
          });
          this.ticketService
            .getTicketsByUserId(this.currentUser.id)
            .subscribe((tickets) => {
              this.userTickets = tickets;
            });
        });
      }
    });
  }

  onSubmit() {
    if (this.currentUser !== undefined && this.currentUser !== null) {
      this.currentUser.username =
        this.editProfileForm.get('username')?.value || '';
      this.userService.update(this.currentUser);
      alert('Profile updated successfully');
    }
  }

  onDeleteProfile() {
    const confirmation = confirm(
      'Are you sure you want to delete your profile?'
    );
    if (confirmation && this.currentUser) {
      this.userService.delete(this.currentUser.id).then(() => {
        this.afAuth.currentUser.then((user) => {
          user?.delete().then(() => {
            this.authService.logout().then(() => {
              alert('Profile deleted successfully');
              this.router.navigate(['/main']);
            });
          });
        });
      });
    }
  }
}
