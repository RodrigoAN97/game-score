import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DBUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-confirm-permissions',
  templateUrl: './confirm-permissions.component.html',
  styleUrls: ['./confirm-permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPermissionsComponent implements OnInit {
  @Input() whoCreated$!: Observable<DBUser>;
  @Input() currentUser!: DBUser;
  keepPermission = true;
  keepGames = true;

  constructor(
    private dialogService: NbDialogService,
    private translateService: TranslateService,
    private firestoreService: FirestoreService,
    private dialogRef: NbDialogRef<ConfirmPermissionsComponent>
  ) {}

  async confirm() {
    const confirm = await lastValueFrom(
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          message: this.getTranslation(
            !this.keepGames
              ? 'Are you sure? Deleting games is not reversible.'
              : 'Are you sure?'
          ),
          title: this.getTranslation('Confirm'),
        },
      }).onClose
    );

    let newUser = { ...this.currentUser };
    if (this.keepGames && this.keepPermission) {
      this.dialogRef.close();
      return;
    }

    if (confirm) {
      console.log('CONFIRMED');
      if (!this.keepGames) {
        console.log('DELETING GAMES');
        await this.deleteUserGames();
      }
      if (!this.keepPermission) {
        console.log('DELETING PERMISSION');
        newUser.permittedUsers = [];
      }
      await this.firestoreService.updateDocument(
        'users',
        this.currentUser.uid,
        newUser
      );
      this.dialogRef.close();
    }
  }

  async deleteUserGames() {
    await this.firestoreService.deleteUserGames(this.currentUser);
  }

  getTranslation(text: string): Observable<string> {
    return this.translateService.get(text);
  }

  ngOnInit(): void {}
}
