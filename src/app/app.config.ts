import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'; 
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

const firebaseConfig  = {
  apiKey: "AIzaSyCRoINsTnrwWj6KriOLF539Tg--QqDpejY",
  authDomain: "profiler-568.firebaseapp.com",
  projectId: "profiler-568",
  storageBucket: "profiler-568.firebasestorage.app",
  messagingSenderId: "281618493",
  appId: "1:281618493:web:17efe1753dbeeaee866254",
  measurementId: "G-7QG03YP8W9"
};

export const appConfig: ApplicationConfig = {
  
  providers: [
    AngularFireAuth,
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
    ]
};



