import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { IGame } from '../shared/interfaces';
import { FirestoreService } from './firestore.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  initialGames$: Observable<IGame[]> =
    this.firestoreService.getCollection('games');
  games$!: Observable<IGame[]>;
  createdByGames$: Observable<IGame[]>;
  colleguesGames$: Observable<IGame[]>;
  myGames$: Observable<IGame[]>;

  createdByFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  colleguesFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  colleguesList$: Observable<string[]>;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {
    const userUid = this.authService.auth.currentUser?.uid as string;

    this.colleguesList$ = (
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

    this.createdByGames$ = combineLatest([
      this.initialGames$,
      this.createdByFilter$,
    ]).pipe(
      map(([initialGames, createByFilter]) => {
        if (!createByFilter) {
          return [];
        } else {
          return initialGames.filter((game) => game.createdBy === userUid);
        }
      })
    );

    this.colleguesGames$ = combineLatest([
      this.initialGames$,
      this.colleguesFilter$,
      this.colleguesList$,
    ]).pipe(
      map(([initialGames, colleguesFilter, colleguesList]) => {
        if (!colleguesFilter) {
          return [];
        } else {
          return initialGames.filter(
            (game) =>
              !game.players.includes(userUid) &&
              game.players.some((p) => colleguesList.includes(p))
          );
        }
      })
    );

    this.myGames$ = this.initialGames$.pipe(
      map((games) => {
        return games.filter((game) => game.players.includes(userUid));
      })
    );

    this.games$ = combineLatest([
      this.createdByGames$,
      this.colleguesGames$,
      this.myGames$,
    ]).pipe(
      map(([createdByGames, colleguesGames, myGames]) => {
        let games: IGame[] = [];
        const allGames = [...createdByGames, ...colleguesGames, ...myGames];
        allGames.forEach((game) => {
          if (!JSON.stringify(games).includes(JSON.stringify(game))) {
            games.push(game);
          }
        });
        return games;
      })
    );
  }
}
