import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { uid } from 'uid';
import { Observable } from 'rxjs';

interface IPlayer {
  player: string;
  createdAt: any;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  gameForm!: FormGroup;
  players$!: Observable<IPlayer[]>;
  constructor(private firebaseService: FirebaseService) {
    this.initialForm();
    this.players$ = this.firebaseService.getCollection('players');
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
    const docId = uid(21);
    const docData = {
      player1: this.gameForm.value.player1,
      player2: this.gameForm.value.player2,
      winner: this.gameForm.value.winner,
      id: docId,
      date: this.gameForm.value.date,
    };
    this.firebaseService.setDocument('games', docId, docData);
    this.initialForm();
  }

  ngOnInit(): void {}
}
