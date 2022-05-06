import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  async addDocument(collectionName:string, docData:any) {
    await addDoc(collection(this.firestore, collectionName), docData);
  }

  async deleteDocument(collectionName: string, docId: string) {
    await deleteDoc(doc(this.firestore, collectionName, docId));
  }

  getCollection (collectionName:string): Observable<any[]> {
    const col = collection(this.firestore, collectionName);
    return collectionData(col);
  }
}
