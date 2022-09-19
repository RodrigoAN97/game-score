import { NbDialogService } from '@nebular/theme';
import { FirestoreService } from '../../services/firestore.service';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { IGame } from '../../shared/interfaces';
import { GamesService } from 'src/app/services/games.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-read',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
  games$: Observable<IGame[]> = this.gamesService.games$;
  constructor(
    private firestoreService: FirestoreService,
    private dialogService: NbDialogService,
    private gamesService: GamesService,
    private translateService: TranslateService
  ) {}

  async deleteGame(id: string) {
    const confirm = await lastValueFrom(
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          title: this.getTranslation('Delete'),
          message: this.getTranslation(
            'Are you sure you wat to delete this game?'
          ),
        },
        closeOnBackdropClick: false,
      }).onClose
    );
    if (confirm) {
      this.firestoreService.deleteDocument('games', id);
    }
  }

  getTranslation(text: string): Observable<string> {
    return this.translateService.get(text);
  }

  ngOnInit(): void {}
}
