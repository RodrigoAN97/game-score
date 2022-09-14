import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {
  NbAccordionModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbToastrModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ScorePipe } from './pipes/score.pipe';
import { PlayerNamePipe } from './pipes/player-name.pipe';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { PermissionToDeletePipe } from './pipes/permission-to-delete.pipe';
import { PermissionToCreatePipe } from './pipes/permission-to-create.pipe';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ScorePipe,
    PlayerNamePipe,
    AlertDialogComponent,
    PermissionToDeletePipe,
    PermissionToCreatePipe,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbEvaIconsModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbButtonModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbUserModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbTabsetModule,
    HttpClientModule,
    NbTooltipModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbAlertModule,
    NbAccordionModule,
    NbPopoverModule,
  ],
  exports: [
    CommonModule,
    ConfirmDialogComponent,
    TranslateModule,
    NbCardModule,
    NbEvaIconsModule,
    NbInputModule,
    NbDatepickerModule,
    NbButtonModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbUserModule,
    NbIconModule,
    NbDialogModule,
    NbToastrModule,
    NbTabsetModule,
    HttpClientModule,
    NbTooltipModule,
    NbLayoutModule,
    ScorePipe,
    PlayerNamePipe,
    NbCheckboxModule,
    PermissionToDeletePipe,
    PermissionToCreatePipe,
    NbAlertModule,
    NbAccordionModule,
    NbPopoverModule,
  ],
})
export class SharedModule {}
