import { FirestoreService } from '../../services/firestore.service';
import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlayerComponent implements OnInit {
  @ViewChild("playerName") playerName!: ElementRef;

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }

  savePlayer() {
    const player = this.playerName.nativeElement.value as string;
    this.firestoreService.setDocument('players', player, {player, createdAt: new Date()});
    this.playerName.nativeElement.value = '';
  }
}
