import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  collectionData,
  Firestore,
  collection,
  deleteDoc,
  doc,
  setDoc,
  query,
  getDocs,
  where,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { DBUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  async setDocument(collectionName: string, docId: string, docData: any) {
    this.read();
    const collectionRef = collection(this.firestore, collectionName);
    await setDoc(doc(collectionRef, docId), docData);
  }

  async upsertDocument(
    collectionName: string,
    docId: string,
    data: any
  ) {
    const collectionRef = collection(this.firestore, collectionName);
    const exists = await this.docExists(collectionName, docId);
    if(exists) {
      await updateDoc(doc(collectionRef, docId), data);
    } else {
      await this.setDocument(collectionName, docId, data);
    }
  }

  async docExists(collectionName: string, docId: string) {
    const docRef = doc(this.firestore, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? true : false;
  }

  async deleteDocument(collectionName: string, docId: string) {
    this.read();
    await deleteDoc(doc(this.firestore, collectionName, docId));
  }

  getCollection(collectionName: string): Observable<any[]> {
    this.read();
    const col = collection(this.firestore, collectionName);
    return collectionData(col);
  }

  async repeatedUser(email: string): Promise<boolean> {
    this.read();
    const matchEmail = query(
      collection(this.firestore, 'users'),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(matchEmail);

    return !!querySnapshot.size;
  }

  async getUser(userUid: string): Promise<DBUser> {
    this.read();
    const docRef = doc(this.firestore, 'users', userUid);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as DBUser;
  }

  getUser$(userUid: string | undefined): Observable<any> {
    this.read();
    if (!userUid) {
      return of(undefined);
    }
    const docRef = doc(this.firestore, 'users', userUid);
    const userData = docData(docRef);
    return userData;
  }

  read() {
    const key = 'firestore';
    const previous = localStorage.getItem(key);
    const newValue = previous ? Number(previous) + 1 : 1;
    localStorage.setItem(key, newValue.toString());
  }
}
