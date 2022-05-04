import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  async addDoc(collectionName:string, docData:any) {
    await addDoc(collection(this.firestore, collectionName), docData);

  }
}
