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
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  auth = getAuth();
  userUid$: BehaviorSubject<string> = new BehaviorSubject('');
  currentUser$!: Observable<DBUser | null>;
  physicalPositions = NbGlobalPhysicalPosition;
  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private toastrService: NbToastrService
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.userUid$.next(user?.uid as string);
      this.currentUser$ = this.firestoreService.getUser$(user?.uid);
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
        this.toastrService.show('Error', errorMessage, {
          position: this.physicalPositions.TOP_RIGHT,
          status: 'danger',
        });
      });
  }

  registerWithEmail(email: string, password: string, displayName: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.saveUser({ ...user, displayName });
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastrService.show('Error', errorMessage, {
          position: this.physicalPositions.TOP_RIGHT,
          status: 'danger',
        });
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
        this.toastrService.show('Error', errorMessage, {
          position: this.physicalPositions.TOP_RIGHT,
          status: 'danger',
        });
      });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('sign out successful');
      })
      .catch((error) => {
        this.toastrService.show('Error', error.message, {
          position: this.physicalPositions.TOP_RIGHT,
          status: 'danger',
        });
      });
  }

  saveUser(user: User) {
    const newUser: Partial<DBUser> = {
      uid: user.uid,
      email: user.email,
    };
    if (user.displayName) newUser.displayName = user.displayName;
    if (user.photoURL) newUser.photoURL = user.photoURL;

    this.firestoreService.upsertDocument('users', user.uid, newUser);
  }
}
