import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { IGame } from '../interfaces';

@Pipe({
  name: 'permissionToDelete',
})
export class PermissionToDeletePipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(game: IGame): boolean {
    const userUid = this.authService.auth.currentUser?.uid as string;
    return game.createdBy === userUid || game.players.includes(userUid);
  }
}
