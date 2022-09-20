import { FirestoreService } from '../../services/firestore.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { uid } from 'uid';
import { Observable } from 'rxjs';
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { DBUser, IGame } from '../../shared/interfaces';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { GamesService } from 'src/app/services/games.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  gameForm = new FormGroup({
    player1: new FormControl('', Validators.required),
    player2: new FormControl('', Validators.required),
    winner: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
  });
  players$: Observable<DBUser[]>;
  physicalPositions = NbGlobalPhysicalPosition;

  constructor(
    private firestoreService: FirestoreService,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private dialogService: NbDialogService,
    private gamesService: GamesService,
    private translateService: TranslateService
  ) {
    this.players$ = this.gamesService.players$;
  }

  async addGame() {
    const docId = uid(21);
    const player1 = this.gameForm.value.player1.uid;
    const player2 = this.gameForm.value.player2.uid;
    const players = [player1, player2];

    if (player1 === player2) {
      this.alert('You need to choose different players');
      return;
    }

    const userUid = this.authService.userUid$.value;
    if (!userUid) {
      this.alert('No user logged in!');
      return;
    }

    const docData: IGame = {
      players,
      winner: this.gameForm.value.winner,
      id: docId,
      date: this.gameForm.value.date,
      createdBy: userUid,
    };
    console.log({ docData });
    this.firestoreService.setDocument('games', docId, docData);
    this.toastrService.show('Success', 'Game was created successfully!', {
      position: this.physicalPositions.TOP_RIGHT,
      status: 'success',
    });
    this.gameForm.reset();
  }

  addNewPlayer() {
    this.dialogService.open(AddPlayerComponent);
  }

  alert(message: string) {
    this.dialogService.open(AlertDialogComponent, {
      context: { message: this.getTranslation(message) },
    });
  }

  getTranslation(text: string): Observable<string> {
    return this.translateService.get(text);
  }

  ngOnInit(): void {}
}
