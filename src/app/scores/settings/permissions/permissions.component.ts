import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { GamesService } from 'src/app/services/games.service';
import { DBUser } from 'src/app/shared/interfaces';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionsComponent implements OnInit {
  players$: Observable<DBUser[]>;
  @Output() permissionsChange = new EventEmitter<string[]>();

  constructor(
    private gamesService: GamesService,
    public authService: AuthService
  ) {
    this.players$ = combineLatest([
      this.gamesService.players$,
      this.authService.userUid$,
    ]).pipe(
      map(([players, userUid]) => {
        return players.filter((player) => player.uid !== userUid);
      })
    );
  }

  changePermissions(users: string[]) {
    this.permissionsChange.emit(users);
  }

  ngOnInit(): void {}
}
