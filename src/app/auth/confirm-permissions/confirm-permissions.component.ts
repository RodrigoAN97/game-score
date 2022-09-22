import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-confirm-permissions',
  templateUrl: './confirm-permissions.component.html',
  styleUrls: ['./confirm-permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmPermissionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
