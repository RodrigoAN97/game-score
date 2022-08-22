import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

const DEFAULT_THEME = 'default';
const DARK_THEME = 'dark';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    translate: TranslateService,
    public themeService: NbThemeService
  ) {
    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('pt');
    translate.use('pt');
  }
  toggleTheme() {
    this.themeService.changeTheme(
      this.themeService.currentTheme === DEFAULT_THEME
        ? DARK_THEME
        : DEFAULT_THEME
    );
  }
}
