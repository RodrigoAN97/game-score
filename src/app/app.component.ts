import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';
import { SettingsComponent } from './scores/settings/settings.component';

const DEFAULT_THEME = 'default';
const DARK_THEME = 'dark';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  currentLang: string;
  constructor(
    private translate: TranslateService,
    public themeService: NbThemeService,
    public authService: AuthService,
    private dialogService: NbDialogService
  ) {
    this.currentLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
    this.translate.addLangs(['en', 'pt']);
    this.translate.setDefaultLang(this.currentLang);
  }

  toggleTheme() {
    this.themeService.changeTheme(
      this.themeService.currentTheme === DEFAULT_THEME
        ? DARK_THEME
        : DEFAULT_THEME
    );
  }

  openSettings() {
    this.dialogService.open(SettingsComponent);
  }

  changeLanguage(lang: 'pt' | 'en') {
    this.translate.use(lang);
  }

  logout() {
    this.authService.logout();
  }
}
