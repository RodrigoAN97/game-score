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

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  gameForm!: FormGroup;
  players$!: Observable<DBUser[]>;
  physicalPositions = NbGlobalPhysicalPosition;

  constructor(
    private firestoreService: FirestoreService,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private dialogService: NbDialogService
  ) {
    this.initialForm();
    this.players$ = this.firestoreService.getCollection('users');
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
    const player1 = this.gameForm.value.player1;
    const player2 = this.gameForm.value.player2;
    const players = [player1, player2].sort((a, b) => (a < b ? -1 : 1));

    if (player1 === player2) {
      alert('You need to choose different players');
      return;
    }

    const userUid = this.authService.auth.currentUser?.uid;
    if (!userUid) {
      alert('No user logged in!');
      return;
    }

    const docData: IGame = {
      players,
      winner: this.gameForm.value.winner,
      id: docId,
      date: this.gameForm.value.date,
      createdBy: userUid,
    };
    this.firestoreService.setDocument('games', docId, docData);
    this.toastrService.show('Success', 'Game was created sucessfully!', {
      position: this.physicalPositions.TOP_RIGHT,
      status: 'success',
    });
    this.initialForm();
  }

  addNewPlayer() {
    this.dialogService.open(AddPlayerComponent);
  }

  ngOnInit(): void {}
}
