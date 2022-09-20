import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { DBUser, IGame } from '../shared/interfaces';
import { FirestoreService } from './firestore.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  initialGames$: Observable<IGame[]> =
    this.firestoreService.getCollection('games');
  games$!: Observable<IGame[]>;
  players$: Observable<DBUser[]> = this.firestoreService.getCollection('users');

  createdByFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  colleaguesFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  colleaguesList$: Observable<string[]>;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {
    const userUid = this.authService.auth.currentUser?.uid as string;

    this.colleaguesList$ = (
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
      this.initialGames$,
      this.createdByFilter$,
      this.colleaguesFilter$,
      this.colleaguesList$,
    ]).pipe(
      map(
        ([initialGames, createdByFilter, colleaguesFilter, colleaguesList]) => {
          const games = initialGames.filter((game) => {
            return (
              (createdByFilter && game.createdBy === userUid) ||
              (colleaguesFilter &&
                game.players.some((p) => colleaguesList.includes(p))) ||
              game.players.includes(userUid)
            );
          });
          return games;
        }
      )
    );
  }
}
