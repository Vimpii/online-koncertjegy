import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Concert } from '../models/Concert';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  collectionName = 'Concerts';

  constructor(private afs: AngularFirestore) {}

  getConcerts() {
    return this.afs
      .collection<Concert>(this.collectionName, (ref) => ref.orderBy('date'))
      .valueChanges();
  }
}
