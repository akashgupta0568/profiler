import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonserviceService } from '../Services/commonservice.service';
// import { getAuth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  auth: any;
  form: NgForm | undefined;
  constructor ( private commonService : CommonserviceService){
    this.auth = getAuth();
  }

  signup() {
  createUserWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
    })
    .catch((error) => {
       const errorCode = error.code;
      this.errorMessage = error.message;
      console.log(error.message);
    });
    }
}
