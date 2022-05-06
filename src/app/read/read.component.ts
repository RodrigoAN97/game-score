import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGame } from '../state/games.models';
import { RemoveGame, GetGames } from '../state/games.actions';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  games$!: Observable<IGame[]>;
  constructor(private store: Store) {
    this.store.dispatch(new GetGames());
    this.games$ = this.store.select((state) => state.games.games);
  }

  deleteGame(id: string) {
    this.store.dispatch(new RemoveGame(id));
  }


  ngOnInit(): void {}
}
