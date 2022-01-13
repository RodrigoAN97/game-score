import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGame } from '../models/game.models';
import { RemoveGame } from '../actions/game.actions';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  games$!: Observable<IGame[]>;
  constructor(private store: Store) {
    this.games$ = this.store.select((state) => state.games.games);
  }

  deleteGame(id: string) {
    this.store.dispatch(new RemoveGame(id));
  }

  getDate(date: Date) {
    return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  ngOnInit(): void {}
}
