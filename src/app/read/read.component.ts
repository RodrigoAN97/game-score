import { FirebaseService } from './../services/firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

export interface IGame {
  players: string[];
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
    //TODO: Make this confirm popup a customized popup and give a toaster message at the endw
    if(confirm('Are you sure you want to delete this game')) {
      this.firebaseService.deleteDocument('games', id);
    }
  }

  ngOnInit(): void {}
}
