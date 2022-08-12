import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(private dialogRef: NbDialogRef<ConfirmDialogComponent>) {}
  @Input() title!: string;
  @Input() message!: string;

  ngOnInit(): void {}

  close(val: boolean) {
    this.dialogRef.close(val);
  }
}
