import { NbDialogService } from '@nebular/theme';
import { FirebaseService } from './../services/firebase.service';
import { lastValueFrom, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

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
    private firebaseService: FirebaseService,
    private dialogService: NbDialogService
  ) {
    this.games$ = this.firebaseService.getCollection('games');
  }

  async deleteGame(id: string) {
    const confirm = await lastValueFrom(this.dialogService
      .open(ConfirmDialogComponent, {
        context: {
          title: 'Delete',
          message: 'Are you sure you wat to delete this game?',
        },
        closeOnBackdropClick: false,
      })
      .onClose);
    if (confirm) {
      this.firebaseService.deleteDocument('games', id);
    }
  }

  ngOnInit(): void {}
}
