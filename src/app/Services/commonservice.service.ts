import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {
  private auth = getAuth();  // Firebase modular SDK instance
  firebaseConfig  = {
    apiKey: "AIzaSyCRoINsTnrwWj6KriOLF539Tg--QqDpejY",
    authDomain: "profiler-568.firebaseapp.com",
    projectId: "profiler-568",
    storageBucket: "profiler-568.firebasestorage.app",
    messagingSenderId: "281618493",
    appId: "1:281618493:web:17efe1753dbeeaee866254",
    measurementId: "G-7QG03YP8W9"
  };

  signUp(email: string, password: string): Observable<any> {
    // Using the new Firebase SDK to create the user
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signIn(email: string, password: string): Observable<any> {
    // Using the new Firebase SDK to sign in the user
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signOut(): Observable<void> {
    // Using the new Firebase SDK to sign out the user
    return from(signOut(this.auth));
  }

  login(email: string, password: string): Observable<any> {
    console.log(this.auth);
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error) => {
        console.error(`Error ${error.code}: ${error.message}`);
        throw error; 
      })
    );
  }
}
