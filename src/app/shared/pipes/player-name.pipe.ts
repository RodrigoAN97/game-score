import { Pipe, PipeTransform } from '@angular/core';
import { from, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';

@Pipe({
  name: 'playerName',
})
export class PlayerNamePipe implements PipeTransform {
  constructor(private firestoreService: FirestoreService) {}

  transform(playerId: string): Observable<string | null> {
    const playerName = from(this.playerName(playerId));
    return playerName;
  }

  async playerName(playerId: string): Promise<string | null> {
    const name = (await this.firestoreService.getUser(playerId)).displayName;
    return name;
  }
}
