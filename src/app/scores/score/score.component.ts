import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from '../read/read.component';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit {
  games$!: Observable<IGame[]>;

  constructor(private firestoreService: FirestoreService) {
    this.games$ = this.firestoreService.getCollection('games');
  }

  values(s: any) {
    // return Object.keys(s);
    return s;
  }

  ngOnInit(): void {}
}
