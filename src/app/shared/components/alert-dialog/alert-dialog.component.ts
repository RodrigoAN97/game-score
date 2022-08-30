import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent implements OnInit {
  constructor(private dialogRef: NbDialogRef<AlertDialogComponent>) {}
  @Input() message!: string;

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
