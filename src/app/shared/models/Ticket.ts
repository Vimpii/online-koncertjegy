import { Concert } from './Concert';

export interface Ticket {
  id: string;
  userId: string;
  concert: string;
  concertId: string;
  count: number;
}
