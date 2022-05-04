import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { uid } from 'uid';
import { AddGame } from '../state/game.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  gameForm!: FormGroup;
  constructor(private store: Store) {
    this.initialForm();
  }

  initialForm() {
    this.gameForm = new FormGroup({
      player1: new FormControl('', Validators.required),
      player2: new FormControl('', Validators.required),
      winner: new FormControl('', Validators.required),
      date: new FormControl(new Date(), Validators.required),
    });
  }

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
    this.initialForm();
  }

  ngOnInit(): void {}
}
