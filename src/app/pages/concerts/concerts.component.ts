import { Component } from '@angular/core';
import { Concert } from '../../shared/models/Concert';
import { ConcertService } from '../../shared/services/concert.service';
import { TicketService } from '../../shared/services/ticket.service';
import { Ticket } from '../../shared/models/Ticket';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrl: './concerts.component.scss',
})
export class ConcertsComponent {
  currentUser: User | undefined;
  concerts: Concert[] = [];
  quantities: { [id: string]: number } = {};

  constructor(
    private concertService: ConcertService,
    private ticketService: TicketService,
    private authService: AuthService,
    private userService: UserService,
    private afs: AngularFirestore
  ) {
    this.concertService.getConcerts().subscribe((concerts) => {
      this.concerts = concerts;
      concerts.forEach((concert) => (this.quantities[concert.id] = 1));
    });
  }

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

    this.concertService.getConcerts().subscribe((concerts) => {
      this.concerts = concerts;
    });
  }

  purchaseTicket(concert: Concert) {
    const quantity = this.quantities[concert.id] || 1;

    const ticket: Ticket = {
      performer: concert.performer,
      location: concert.location,
      image: concert.image,
      date: concert.date,
      id: this.afs.createId(), // Generate a new ID for the ticket
      userId: this.currentUser?.id || '',
      concertId: concert.id,
      count: quantity,
    };

    this.ticketService.createTicket(ticket).then(() => {
      alert('Ticket purchase was successful');
    });
  }
}
