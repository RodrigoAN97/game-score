import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';

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
    public themeService: NbThemeService,
    public authService: AuthService
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

  logout() {
    this.authService.logout();
  }
}
