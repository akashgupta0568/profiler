import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { PopupComponent } from './popup/popup.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // { path: 'dash', component: PopupComponent},
    { path:'home', component:HomeComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'login', component : LoginComponent},
    { path: 'inq', component: InquiryComponent},
    { path: '**', redirectTo: '/login' }
];
