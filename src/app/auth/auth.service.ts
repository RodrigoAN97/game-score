import { Injectable } from '@angular/core';
import {
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';
import { DBUser } from '../shared/interfaces';

const google = new GoogleAuthProvider();
google.addScope('https://www.googleapis.com/auth/contacts.readonly');
google.setCustomParameters({
  login_hint: 'user@example.com',
});

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  userUid: string | undefined;
  currentUser$!: Observable<DBUser | null>;
  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.userUid = user?.uid;
      this.currentUser$ = this.firestoreService.getUser$(this.userUid);
    });
  }

  loginWithGoogle() {
    signInWithPopup(this.auth, google)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(
          result
        ) as OAuthCredential;
        const token = credential.accessToken;
        const user = result.user;
        console.log('success', { credential, token, user });
        this.saveUser(user);
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

  registerWithEmail(email: string, password: string, displayName: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.saveUser({ ...user, displayName });
        this.router.navigate(['/']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  loginWithEmail(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.saveUser(user);
        this.router.navigate(['/']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('sign out successful');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  saveUser(user: User) {
    const dbUser: DBUser = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      permittedUsers: [],
    };
    this.firestoreService.setDocument('users', user.uid, dbUser);
  }
}
