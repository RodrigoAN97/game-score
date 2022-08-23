import { NbDialogService } from '@nebular/theme';
import { FirestoreService } from '../../services/firestore.service';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadComponent implements OnInit {
  games$!: Observable<IGame[]>;
  constructor(
    private firestoreService: FirestoreService,
    private dialogService: NbDialogService
  ) {
    this.games$ = this.firestoreService
      .getCollection('games')
      .pipe(map((games: IGame[]) => games.sort((a, b) => b.date - a.date)));
  }

  async deleteGame(id: string) {
    const confirm = await lastValueFrom(
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          title: 'Delete',
          message: 'Are you sure you wat to delete this game?',
        },
        closeOnBackdropClick: false,
      }).onClose
    );
    if (confirm) {
      this.firestoreService.deleteDocument('games', id);
    }
  }

  ngOnInit(): void {}
}
