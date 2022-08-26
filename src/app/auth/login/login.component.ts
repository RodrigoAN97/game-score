import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
} from 'firebase/auth';

const google = new GoogleAuthProvider();
google.addScope('https://www.googleapis.com/auth/contacts.readonly');
google.setCustomParameters({
  login_hint: 'user@example.com',
});

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    const auth = getAuth();
    signInWithPopup(auth, google)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(
          result
        ) as OAuthCredential;
        const token = credential.accessToken;
        const user = result.user;
        console.log('success', { credential, token, user });
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('error', { errorCode, errorMessage, email, credential });
      });
  }
}
