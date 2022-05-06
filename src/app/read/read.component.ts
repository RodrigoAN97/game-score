import { FirebaseService } from './../services/firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

export interface IGame {
  player1: string;
  player2: string;
  winner: string;
  id: string;
  date: any;
}

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  games$!: Observable<IGame[]>;
  constructor(private firebaseService: FirebaseService) {
    this.games$ = this.firebaseService.getCollection('games');
  }

  deleteGame(id: string) {
    this.firebaseService.deleteDocument('games', id);
  }

  ngOnInit(): void {}
}
