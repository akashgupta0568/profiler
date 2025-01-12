import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword,RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import { CommonserviceService } from '../Services/commonservice.service';
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  credential:any;
  auth:any;
  provider:any;
  phoneNumber: string = '';
  verificationCode: string = '';
  verificationSent: boolean = false;
  message: string = '';
  size:any;
  private recaptchaVerifier: RecaptchaVerifier | undefined;

  @ViewChild('recaptchaContainer', { static: false }) recaptchaContainer!: ElementRef;

  constructor(private commonService : CommonserviceService){
    this.auth = getAuth();
    this.auth.languageCode = 'it';
    this.provider = new GoogleAuthProvider();
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
  }

  ngAfterViewInit() {
    this.initializeRecaptcha();
  }
  initializeRecaptcha() {
    const auth = getAuth();
    auth.languageCode = 'en'; // Optional: Set language code

    if (!this.recaptchaContainer || !this.recaptchaContainer.nativeElement) {
      console.error("Recaptcha container is not available");
      return;
    }

    this.recaptchaVerifier = new RecaptchaVerifier(
      this.recaptchaContainer.nativeElement, // Use the nativeElement from ViewChild
      // {
      //   size : 'normal', // Set the reCAPTCHA size, can be 'normal' or 'invisible'
      //   callback: (response: any) => {
      //     console.log("Recaptcha Verified", response);
      //   },
      //   'expired-callback': () => {
      //     console.log("Recaptcha expired, please complete it again.");
      //   }
      // },
      this.auth
    );

    this.recaptchaVerifier.render().then((widgetId: any) => {
      console.log("Recaptcha Widget ID:", widgetId);
    }).catch((error) => {
      console.error("Error rendering reCAPTCHA:", error);
    });
  }


  onLogin() {
    this.commonService.login(this.email, this.password).subscribe(
      (user) => {
        console.log('User logged in:', user);
      },
      (error) => {
        // Handle login error
        this.errorMessage = `Error: ${error.message}`;
        console.error('Login failed', error);
      }
    );
  }  

  // GoogleLogin(){
  //   signInWithPopup(this.auth, this.provider)
  // .then((result) => {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   this.credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = this.credential.accessToken;
  //   // The signed-in user info.
  //   const user = result.user;
  //   // IdP data available using getAdditionalUserInfo(result)
  //   // ...
  // }).catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });
  // }
  GoogleLogin() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // Access token and user information
        this.credential = GoogleAuthProvider.credentialFromResult(result);
        const token = this.credential.accessToken;
        const user = result.user;

        console.log('Google login successful:', user);
      })
      .catch((error) => {
        // Handle login error
        this.errorMessage = error.message;
        console.error('Google login failed:', error);
      });
  }

  sendVerificationCode() {
    if (!this.recaptchaVerifier) return;

    const auth = getAuth();
    signInWithPhoneNumber(auth, this.phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to enter the code.
        this.verificationSent = true;
        this.message = "Verification code sent.";
        (window as any).confirmationResult = confirmationResult; // Store confirmationResult globally for later use
      })
      .catch((error) => {
        this.message = `Error sending SMS: ${error.message}`;
        console.error("SMS Not Sent:", error);
      });
  }

  // Step 3: Verify Code
  verifyCode() {
    const confirmationResult = (window as any).confirmationResult;
    if (!confirmationResult) {
      this.message = "Error: No confirmation result found.";
      return;
    }

    confirmationResult.confirm(this.verificationCode)
      .then((result: any) => {
        // User signed in successfully.
        this.message = "Phone number verified! User signed in.";
        const user = result.user;
        console.log("User logged in with phone number:", user);
      })
      .catch((error: any) => {
        // Verification code invalid.
        this.message = `Error verifying code: ${error.message}`;
        console.error("Verification failed:", error);
      });
  }

  PhoneLogin(event: Event) {
    event.preventDefault();

    if (this.phoneNumber) {
      this.sendVerificationCode();
    } else {
      this.message = "Please enter a valid phone number.";
    }
  }
}
