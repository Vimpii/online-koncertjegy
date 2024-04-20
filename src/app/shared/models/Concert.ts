import { Timestamp } from '@angular/fire/firestore';

export interface Concert {
  id: string;
  performer: string;
  location: string;
  date: Timestamp;
  image: string;
}
