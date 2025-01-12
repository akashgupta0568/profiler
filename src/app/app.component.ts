import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc, DocumentData } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { PopupComponent } from "./popup/popup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLinkActive, RouterModule, PopupComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrected `styleUrls`
})
export class AppComponent implements OnInit{
  private db: any;
  firebaseConfig = {
    apiKey: "AIzaSyCRoINsTnrwWj6KriOLF539Tg--QqDpejY",
    authDomain: "profiler-568.firebaseapp.com",
    projectId: "profiler-568",
    storageBucket: "profiler-568.firebasestorage.app",
    messagingSenderId: "281618493",
    appId: "1:281618493:web:17efe1753dbeeaee866254",
    measurementId: "G-7QG03YP8W9"
  };
  userData:any = [];
  userId: string = "OvTK1vpJefxiaiEVh58E";
  email: string = "user@example.com";
  name: string = "John Doe";
  title = 'Profiler';
  userArray = [];
  showPopup = true;
  private app: any;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    const analytics = getAnalytics(this.app);
    const auth = getAuth(this.app);
    console.log("Analytics initialized:", analytics);
    console.log("Auth initialized:", auth);
    this.db = getFirestore(this.app);
    // this.addUserData('users');
    this.getAllUsers('users');
    // this.saveUserData();
  }

  ngOnInit() {
    // Set showPopup to true when the component initializes
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;  // Hide popup when the close button is clicked
  }
  async addUserData(collectionName: 'users') {
    try {
      alert("Add  user data");
      collectionName = "users";
      const userData = { email: this.email, name: this.name };
      const docRef = await addDoc(collection(this.db, collectionName), userData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getAllUsers(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(this.db, collectionName));
      
      // Clear userArray to avoid duplicates on repeated calls
      this.userArray = [];

      // Loop through each document and store it in the userArray
      querySnapshot.forEach((doc) => {
        const userData = { id: doc.id, ...(doc.data() as DocumentData) };  // Type assert as DocumentData
        console.log(`Document ID: ${doc.id}, Document Data:`, userData);
        // this.userArray.push(userData);
      });

      console.log('User Array:', this.userArray);
      return this.userArray;

    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
  
  // Retrieve a document by ID
  async getUserById(collectionName: string, id: string) {
    const docRef = doc(this.db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  // Update or set a document by ID
  async updateUserById(collectionName: string, id: string, userData: any) {
    const docRef = doc(this.db, collectionName, id);
    await setDoc(docRef, userData, { merge: true });
    console.log("Document updated!");
  }

  // Delete a document by ID
  async deleteUserById(collectionName: string, id: string) {
    await deleteDoc(doc(this.db, collectionName, id));
    console.log("Document deleted!");
  }
}
