import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IGame } from '../shared/interfaces';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  games$: Observable<IGame[]>;

  constructor(private firestoreService: FirestoreService) {
    this.games$ = this.firestoreService
      .getCollection('games')
      .pipe(map((games: IGame[]) => games.sort((a, b) => b.date - a.date)));
  }
}
