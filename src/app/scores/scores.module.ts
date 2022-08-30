import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlayerComponent } from './add-player/add-player.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { ScoreComponent } from './score/score.component';
import { ScorePipe } from './score.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TabsComponent } from './tabs/tabs.component';
import { ScoresRoutingModule } from './scores-routing.module';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbTabsetModule, NbToastrModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AddPlayerComponent,
    CreateComponent,
    ReadComponent,
    ScoreComponent,
    ScorePipe,
    TabsComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ScoresRoutingModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbButtonModule,
    NbSelectModule,
    NbCardModule,
    NbUserModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(),
    NbCardModule,
    NbTabsetModule,
    ReactiveFormsModule,
  ],
})
export class ScoresModule {}
