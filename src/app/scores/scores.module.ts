import { NgModule } from '@angular/core';
import { AddPlayerComponent } from './add-player/add-player.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { ScoreComponent } from './score/score.component';
import { TabsComponent } from './tabs/tabs.component';
import { ScoresRoutingModule } from './scores-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OptionsComponent } from './tabs/options/options.component';

@NgModule({
  declarations: [
    AddPlayerComponent,
    CreateComponent,
    ReadComponent,
    ScoreComponent,
    TabsComponent,
    OptionsComponent,
  ],
  imports: [ScoresRoutingModule, SharedModule],
})
export class ScoresModule {}
