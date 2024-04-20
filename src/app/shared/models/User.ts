import { Ticket } from './Ticket';

export interface User {
  id: string;
  email: string;
  username: string;
  tickets: Ticket[];
}
