import { FirestoreService } from '../../services/firestore.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { uid } from 'uid';
import { lastValueFrom, Observable } from 'rxjs';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { regexEmailPattern } from 'src/app/shared/regex';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { DBUser } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/auth/auth.service';

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
    private dialogRef: NbDialogRef<AddPlayerComponent>,
    private translateService: TranslateService,
    private authService: AuthService
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
    const currentUserUid = this.authService.userUid$.value;
    const user: Partial<DBUser> = {
      displayName,
      email,
      permittedUsers: [currentUserUid],
      confirmed: false,
      uid: docId
    };

    const repeatedUser = !!(await this.firestoreService.getUserByEmail(email));
    if (repeatedUser) {
      this.dialogService.open(AlertDialogComponent, {
        context: {
          message: this.getTranslation('This email already has a created user'),
        },
      });
      return;
    }

    const confirm = await lastValueFrom(
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          title: this.getTranslation('Add'),
          message: this.getTranslation(
            'Are you sure to want to add this user?'
          ),
        },
      }).onClose
    );

    if (confirm) {
      this.firestoreService.setDocument('users', docId, user);
      this.dialogRef.close();
    }
  }

  getTranslation(text: string): Observable<string> {
    return this.translateService.get(text);
  }
}
