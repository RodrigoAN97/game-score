import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from '../create/create.component';
import { IGame } from '../read/read.component';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit {
  games$!: Observable<IGame[]>;
  players$!: Observable<IPlayer[]>;

  constructor(private firebaseService: FirebaseService) {
    this.games$ = this.firebaseService.getCollection('games');
    this.players$ = this.firebaseService.getCollection('players');
  }

  ngOnInit(): void {
  }

}
