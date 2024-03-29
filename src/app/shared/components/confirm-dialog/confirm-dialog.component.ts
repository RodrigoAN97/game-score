import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
  constructor(private dialogRef: NbDialogRef<ConfirmDialogComponent>) {}
  @Input() title!: Observable<string>;
  @Input() message!: Observable<string>;

  ngOnInit(): void {}

  close(val: boolean) {
    this.dialogRef.close(val);
  }
}
