import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  constructor() {}

  ngOnInit(): void {}

  login() {
    const auth = getAuth();
    signInWithPopup(auth, google)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(
          result
        ) as OAuthCredential;
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log('success', { credential, token, user });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log('error', { errorCode, errorMessage, email, credential });
      });
  }
}
