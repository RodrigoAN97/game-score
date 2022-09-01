import { NgModule } from '@angular/core';
import { AddPlayerComponent } from './add-player/add-player.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { ScoreComponent } from './score/score.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TabsComponent } from './tabs/tabs.component';
import { ScoresRoutingModule } from './scores-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddPlayerComponent,
    CreateComponent,
    ReadComponent,
    ScoreComponent,
    TabsComponent,
  ],
  imports: [ScoresRoutingModule, SharedModule],
})
export class ScoresModule {}
