import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  async setDocument(collectionName:string, docId:string, docData:any) {
    const collectionRef = collection(this.firestore, collectionName);
    await setDoc(doc(collectionRef, docId), docData);  
  }

  async deleteDocument(collectionName: string, docId: string) {
    await deleteDoc(doc(this.firestore, collectionName, docId));
  }

  getCollection (collectionName:string): Observable<any[]> {
    const col = collection(this.firestore, collectionName);
    return collectionData(col);
  }
}
