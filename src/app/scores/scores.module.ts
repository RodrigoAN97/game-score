import { NgModule } from '@angular/core';
import { AddPlayerComponent } from './add-player/add-player.component';
import { CreateComponent } from './create/create.component';
import { HistoryComponent } from './history/history.component';
import { ScoreComponent } from './score/score.component';
import { TabsComponent } from './tabs/tabs.component';
import { ScoresRoutingModule } from './scores-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OptionsComponent } from './settings/options/options.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AddPlayerComponent,
    CreateComponent,
    HistoryComponent,
    ScoreComponent,
    TabsComponent,
    OptionsComponent,
    SettingsComponent,
  ],
  imports: [ScoresRoutingModule, SharedModule],
})
export class ScoresModule {}
