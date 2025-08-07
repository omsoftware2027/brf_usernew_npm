import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginFormGroup!: FormGroup;
  retryError = false;
  loginData:any;
  submitted:boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService:AuthService) { }

  // On Forgotpassword link click
  // onForgotpassword() {
  //   this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  // }

  // On Signup link click
  // onSignup() {
  //   this.router.navigate(['register'], { relativeTo: this.route.parent });
  // }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // if(localStorage.getItem('token')){
    //   localStorage.removeItem('token');
    // }
    
    if (this.authService.getToken()) {
      this.authService.clearToken();
    }
  }

  get formControl() {
    return this.loginFormGroup.controls;
  }

  onSubmit() {
   // this.router.navigate(['/civantage'], { relativeTo: this.route.parent });
    this.submitted = true;
    if(this.loginFormGroup.valid){
      const loginpayload ={
        email: this.loginFormGroup.value.username,
        password: this.loginFormGroup.value.password,
       };
   
       this.authService.login(loginpayload).subscribe(data => {
         this.loginData = data;
         this.submitted = false;
         // @ts-ignore
         if (data && data.value === 'Not Authorized') {
        //  this.snackBar.open('Wrong Username or Password Enter , try Again', '', {
        //      duration: 3000,
        //      panelClass: ['error-snackbar']
        //   });
           this.retryError = true;
   
         } else if(this.loginData && this.loginData.value  === 'Inactive'){
          //  this.snackBar.open('User is Inactive , Contact To Your Admin and Activate Your Account', '', {
          //    duration: 3000,
          //    panelClass: ['error-snackbar']
          //  });
           this.retryError = true;
         } else {
           // @ts-ignore
           if (data && data.value === 'Another User LoggedIn') {
            //  this.snackBar.open('Another User LoggedIn', '', {
            //    duration: 3000,
            //    panelClass: ['error-snackbar']
            //  });
             } else {
            //    this.snackBar.open('Login Successfully', '', {
            //      duration: 3000,
            //      panelClass: ['success-snackbar']
            //  });
          
         }}
       }, (error => {
        // this.snackBar.open('Please Enter correct details', '', {
        //   duration: 3000,
        //   panelClass: ['error-snackbar']
        // });
       }));
    }
   
 }

}
