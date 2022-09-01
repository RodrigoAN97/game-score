import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbTabsetModule,
  NbToastrModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ScorePipe } from './pipes/score.pipe';
import { PlayerNamePipe } from './pipes/player-name.pipe';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent, ScorePipe, PlayerNamePipe, AlertDialogComponent],
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
  ],
})
export class SharedModule {}
