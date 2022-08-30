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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [ConfirmDialogComponent],
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
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
    NbLayoutModule
  ],
})
export class SharedModule {}
