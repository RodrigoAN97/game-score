import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { IGame } from '../shared/interfaces';
import { FirestoreService } from './firestore.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  games$: Observable<IGame[]>;
  createdByFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  colleguesFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  collegues$: Observable<string[]>;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {
    const userUid = this.authService.auth.currentUser?.uid as string;

    this.collegues$ = (
      this.firestoreService.getCollection('games') as Observable<IGame[]>
    ).pipe(
      map((games) => {
        let col: string[] = [];
        games.forEach((game) => {
          if (game.players.includes(userUid)) {
            const colPlayer = game.players.filter((p) => p !== userUid)[0];
            if (!col.includes(colPlayer)) {
              col.push(colPlayer);
            }
          }
        });
        return col;
      })
    );

    this.games$ = combineLatest([
      this.firestoreService.getCollection('games') as Observable<IGame[]>,
      this.createdByFilter$,
      this.colleguesFilter$,
      this.collegues$,
    ]).pipe(
      map(([games, createdByFilter, colleguesFilter, collegues]) => {
        return games.filter((game) => {
          if (createdByFilter) {
            return game.createdBy === userUid;
          } else if (colleguesFilter) {
            return game.players.some((player) => collegues.includes(player));
          } else {
            return;
          }
        });
      })
    );
  }
}
