import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  updatedPermittedUsers!: string[];
  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private dialogRef: NbDialogRef<SettingsComponent>
  ) {
    lastValueFrom(this.dialogRef.onClose).then(() => {
      if (this.updatedPermittedUsers) {
        this.savePermissions();
      }
    });
  }

  ngOnInit(): void {}

  savePermissions() {
    const userUid = this.authService.userUid$.value;
    this.firestoreService.updateDocument('users', userUid, {
      permittedUsers: this.updatedPermittedUsers,
    });
  }

  ngOnDestroy(): void {}
}
