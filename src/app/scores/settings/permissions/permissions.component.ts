import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  players$!: Observable<DBUser[]>;

  constructor(
    private gamesService: GamesService,
    private authService: AuthService
  ) {
    const userUid = authService.auth.currentUser?.uid as string;

    this.players$ = this.gamesService.players$.pipe(
      map((players) => {
        return players.filter((player) => player.uid !== userUid);
      })
    );
  }

  ngOnInit(): void {}
}
