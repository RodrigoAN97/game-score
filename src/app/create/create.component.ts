import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  gameForm = new FormGroup({
    player1: new FormControl(''),
    player2: new FormControl(''),
    winner: new FormControl(''),
    date: new FormControl(new Date()),
  });

  addGame() {
    this.store.dispatch(
      new AddGame({
        player1: this.gameForm.value.player1,
        player2: this.gameForm.value.player2,
        winner: this.gameForm.value.winner,
        id: uid(),
        date: this.gameForm.value.date,
      })
    );
  }

  ngOnInit(): void {}
}
