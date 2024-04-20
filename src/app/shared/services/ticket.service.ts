import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ticket } from '../models/Ticket';
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { switchMap, map, mergeMap, toArray } from 'rxjs/operators';
import { Concert } from '../models/Concert';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  collectionName = 'Tickets';

  currentUser: User | undefined;

  constructor(
    private afs: AngularFirestore,
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
          this.currentUser = currentUser;
        });
      }
    });
  }

  getTicketsByUserId(userId: string) {
    console.log('Fetching tickets for user:', userId);
    return this.afs
      .collection<Ticket>(this.collectionName, (ref) =>
        ref.where('userId', '==', userId)
      )
      .valueChanges();
  }
}
