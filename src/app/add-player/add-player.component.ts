import { FirebaseService } from './../services/firebase.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
  @ViewChild("playerName") playerName!: ElementRef;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  savePlayer() {
    const player = this.playerName.nativeElement.value as string;
    this.firebaseService.setDocument('players', player, {player, createdAt: new Date()});
    this.playerName.nativeElement.value = '';
  }
}
