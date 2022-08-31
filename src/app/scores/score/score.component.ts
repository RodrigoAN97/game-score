import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from '../../shared/interfaces';
import { FirestoreService } from '../../services/firestore.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit {
  games$: Observable<IGame[]> = this.gamesService.games$;

  constructor(private firestoreService: FirestoreService, private gamesService: GamesService) {}

  values(s: any) {
    // return Object.keys(s);
    return s;
  }

  ngOnInit(): void {}
}
