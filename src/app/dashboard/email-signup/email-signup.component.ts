import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.component.html',
  styleUrls: ['./email-signup.component.scss']
})
export class EmailSignupComponent {
  formGroup!:FormGroup;
  SignUpForm!:FormGroup;
  loginData:any;
  retryError = false;
  submitted:boolean=false;
constructor(private formBuilder:FormBuilder,private dashboardservice:DashboardService,private matsnackbar:MatSnackBar){
  this.formGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  this.SignUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['',Validators.required],
    mobile:['',Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
    lastName:['']

  });
}
onSubmit() {
  // this.router.navigate(['/civantage'], { relativeTo: this.route.parent });
  console.log('hi')

   const loginpayload ={
    email: this.formGroup.value.email,
    password: this.formGroup.value.password,

   };

   this.dashboardservice.login(loginpayload).subscribe(data => {
     this.loginData = data;   
     localStorage.setItem('id', this.loginData.response.id);
     console.log(this.loginData.response.id,'loginData');
     this.matsnackbar.open("Login Successfully", 'x', { duration: 2000 });
   

     // @ts-ignore
     if (data && data.value === 'Not Authorized') {
     this.matsnackbar.open('Wrong Username or Password Enter , try Again', '', {
         duration: 3000,
         panelClass: ['error-snackbar']
      });
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
         this.matsnackbar.open('Another User LoggedIn', '', {
           duration: 3000,
           panelClass: ['error-snackbar']
         });
         } else {
        //    this.snackBar.open('Login Successfully', '', {
        //      duration: 3000,
        //      panelClass: ['success-snackbar']
        //  });
        //  this.router.navigate(['/dashboard'], { relativeTo: this.route.parent });

     }}
   }, (error => {
    this.matsnackbar.open('Please Enter correct details', '', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
   }));

}

submit(){
 this.submitted=true;
 if(this.SignUpForm.valid){
  let data = {
    email: this.SignUpForm.value.email,
    firstName: this.SignUpForm.value.firstName,
    mobile:this.SignUpForm.value.mobile,
    lastName:this.SignUpForm.value.mobile,
  }
  this.dashboardservice.signup(data).subscribe((res) => {
    if (res.status == 0) {
      this.matsnackbar.open("Sign Up  Successfully", 'x', { duration: 2000 });
      const dropdownToggle = document.querySelector('.dropdown-toggle');
      if (dropdownToggle) {
        dropdownToggle.classList.remove('show');
      }
    }
    else {
      this.matsnackbar.open("Error while updating", 'x', { duration: 2000 });
    }
  })
 }

}
}
