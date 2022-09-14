import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DBUser } from '../interfaces';

@Pipe({
  name: 'permissionToCreate'
})
export class PermissionToCreatePipe implements PipeTransform {
  constructor(private authService: AuthService){}

  transform(players: DBUser[] | null): DBUser[] | undefined {
    const userUid = this.authService.userUid as string;
    return players?.filter(player => player.permittedUsers?.includes(userUid));
  }

}
