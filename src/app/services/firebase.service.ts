import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  async addDocument(collectionName:string, docData:any) {
    await addDoc(collection(this.firestore, collectionName), docData);
  }

  async getCollection (collectionName:string): Promise<any[]> {
    const querySnapshot = await getDocs(collection(this.firestore, collectionName));
    return querySnapshot.docChanges().map(item => item.doc.data());
  }
}
