import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log('logged in', user);
          resolve(true);
        } else {
          console.log('user need to be logged in');
          this.router.navigate(['/login']);
          reject(false);
        }
      });
    });
  }
}
