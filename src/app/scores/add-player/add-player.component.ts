import { FirestoreService } from '../../services/firestore.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { uid } from 'uid';
import { lastValueFrom } from 'rxjs';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { regexEmailPattern } from 'src/app/shared/regex';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlayerComponent implements OnInit {
  playerForm!: FormGroup;

  constructor(
    private firestoreService: FirestoreService,
    private dialogService: NbDialogService,
    private dialogRef: NbDialogRef<AddPlayerComponent>
  ) {
    this.playerForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(regexEmailPattern),
      ]),
    });
  }

  ngOnInit(): void {}

  async savePlayer() {
    const docId = uid(21);
    const displayName = this.playerForm.value.displayName;
    const email = this.playerForm.value.email;
    const user = { displayName, email };

    const repeatedUser = await this.firestoreService.repeatedUser(email);
    if (repeatedUser) {
      // TODO: create custom alert
      alert('This email already has a created user');
      return;
    }

    const confirm = await lastValueFrom(
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          title: 'Add',
          message: `Are you sure to want to add ${displayName}?`,
        },
      }).onClose
    );

    if (confirm) {
      this.firestoreService.setDocument('users', docId, user);
      this.dialogRef.close();
    }
  }
}
