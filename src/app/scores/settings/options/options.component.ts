import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent implements OnInit {
  constructor(public gamesService: GamesService) {}

  ngOnInit(): void {}
}
