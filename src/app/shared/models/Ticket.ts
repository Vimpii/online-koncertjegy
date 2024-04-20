import { Timestamp } from '@angular/fire/firestore';
import { Concert } from './Concert';

export interface Ticket {
  performer: string;
  location: string;
  image: string;
  date: Timestamp;
  id: string;
  userId: string;
  concertId: string;
  count: number;
}
