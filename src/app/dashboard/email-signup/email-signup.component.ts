import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.component.html',
  styleUrls: ['./email-signup.component.scss']
})
export class EmailSignupComponent {
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  formGroup!:FormGroup;
  SignUpForm!:FormGroup;
  forgotpasswordform!:FormGroup;
  loginData:any;
  login:boolean=true;
  retryError = false;
  submitted:boolean=false;
  submittedd:boolean=false;

constructor(private formBuilder:FormBuilder,private dashboardservice:DashboardService,private router:Router,    private matsnackbar:MatSnackBar,private route:ActivatedRoute){

}
ngOnInit() {;
  this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.forgotpasswordform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
   
    });
    this.SignUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['',Validators.required],
      lastName:['',Validators.required],
      mobile:['',Validators.required],
      

    });
  // if (!this.token) {
  //     localStorage.removeItem('Id');
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('name')
  //     localStorage.clear();
  //     this.loggedIn.next(false);
  //     this.router.navigate(['/login']);
  // }

  /* Search Bar */
  // $(document).ready(function () {
  //     $(".search-btn-mobile").on("click", function () {
  //         $(".search-bar").addClass("full-search-bar");
  //     });
  //     $(".search-arrow-back").on("click", function () {
  //         $(".search-bar").removeClass("full-search-bar");
  //     });
  // });


}
signin(){
  this.login=true;
}
onSubmit() {
  // this.router.navigate(['/civantage'], { relativeTo: this.route.parent });
 
  this.submittedd=true;
if(this.formGroup.valid){
  const loginpayload ={
    email: this.formGroup.value.email,
    password: this.formGroup.value.password,

   };

   this.dashboardservice.login(loginpayload).subscribe(data => {
    this.loginData = data;
    console.log(data, 'this.loginData'); // Log received data

    if (this.loginData.status === 0) {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('id', this.loginData.response.id);
      localStorage.setItem('token', this.loginData.response.token);
      console.log(this.loginData.response.id, 'loginData');
      window.location.reload();
      this.matsnackbar.open("Login Successfully", 'x', { duration: 2000 });
    
      if (this.dropdownMenu.nativeElement.classList.contains('show')) {
        this.dropdownMenu.nativeElement.classList.remove('show');
      }
      this.formGroup.reset();
    } else if (this.loginData.status === -1) { // Added else if block for -1 status
      this.matsnackbar.open(this.loginData.response, 'x', { duration: 2000 });
      console.log('Snackbar opened for -1 status');
    } else {
      // Display error message from loginData.response.error or any appropriate field
      // const errorMessage = this.loginData.response || 'Unknown error occurred';
      // this.matsnackbar.open(errorMessage, 'x', { duration: 2000 });
    }
  },
  error => {
    // Handle HTTP errors
    this.matsnackbar.open(this.loginData.response, 'x', { duration: 2000 });; // Log error
    // Uncomment below line if you need to access loginData here
    // console.log(this.loginData.response,'d')
    // this.matsnackbar.open(this.loginData.response, 'x', { duration: 2000 });
  });
}
   

}

// submit(){
//  this.submitted=true;
//  if(this.SignUpForm.valid){
//   let data = {
//     email: this.SignUpForm.value.email,
//     firstName: this.SignUpForm.value.firstName,
//     mobile:this.SignUpForm.value.mobile,
//     lastName:this.SignUpForm.value.mobile,
//   }
//   this.dashboardservice.signup(data).subscribe((res) => {
//     if (res.status == 0) {
//       this.matsnackbar.open("Sign Up  Successfully", 'x', { duration: 2000 });
//       const dropdownToggle = document.querySelector('.dropdown-toggle');
//       if (dropdownToggle) {
//         dropdownToggle.classList.remove('show');
//       }
//     }
//     else {
//       this.matsnackbar.open("Error while updating", 'x', { duration: 2000 });
//     }
//   })
//  }

// }
submit(){
  this.submitted=true;
  console.log('hk')
   if(this.SignUpForm.valid){
    console.log('hk')
    let data = {
      email: this.SignUpForm.value.email,
      firstName: this.SignUpForm.value.firstName,
      lastName: this.SignUpForm.value.lastName,
      mobile:this.SignUpForm.value.mobile,
    
    }
    this.dashboardservice.signup(data).subscribe((res) => {
      if (res.status == 0) {
        this.matsnackbar.open("Sign Up  Successfully", 'x', { duration: 2000 });
        this.SignUpForm.reset();
        this.router.navigate(['/dashboard'], { relativeTo: this.route.parent });
        // const dropdownToggle = document.querySelector('.dropdown-toggle');
        // if (dropdownToggle) {
        //   dropdownToggle.classList.remove('show');
        // }
      }
      else {
        this.matsnackbar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
   }
  
  }
  keyPressNumbers(event:any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  forgotpasssword(){
    this.login =false;
  }
  forgotpassword(){
   
    let data =
    {
      username:this.forgotpasswordform.value.email
    }
    this.dashboardservice.forgotpassword(data).subscribe((res:any) => {
      if (res.status == 0) {
        this.matsnackbar.open(res.response, 'x', { duration: 2000 });
        this.SignUpForm.reset();
        // this.router.navigate(['/dashboard'], { relativeTo: this.route.parent });
        // const dropdownToggle = document.querySelector('.dropdown-toggle');
        // if (dropdownToggle) {
        //   dropdownToggle.classList.remove('show');
        // }
      }
      else {
        this.matsnackbar.open(res.response, 'x', { duration: 2000 });
      }
    })
  }
}
