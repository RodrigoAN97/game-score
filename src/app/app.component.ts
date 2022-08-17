import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

const DEFAULT_THEME = 'default';
const DARK_THEME = 'dark';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public themeService: NbThemeService) {}

  toggleTheme() {
    this.themeService.changeTheme(
      this.themeService.currentTheme === DEFAULT_THEME
        ? DARK_THEME
        : DEFAULT_THEME
    );
  }
}
