import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { uid } from 'uid';
import { AddGame } from '../actions/game.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(private store: Store) {}

  addGame(player1: string, player2: string, winner: string, date: string) {
    this.store.dispatch(
      new AddGame({
        player1: player1,
        player2: player2,
        winner: winner,
        id: uid(),
        date: new Date(date),
      })
    );
  }

  ngOnInit(): void {}
}
