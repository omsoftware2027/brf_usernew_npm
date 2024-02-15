import { Component } from '@angular/core';
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
  formGroup!:FormGroup;
  SignUpForm!:FormGroup;
  loginData:any;
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
     localStorage.setItem('id', this.loginData.response.id);
     localStorage.setItem('token', this.loginData.response.token);
     console.log(this.loginData.response.id,'loginData');
     this.matsnackbar.open("Login Successfully", 'x', { duration: 2000 });
    this.formGroup.reset();
    this.router.navigate(['/dashboard'], { relativeTo: this.route.parent });
    //  if (this.dropdownMenu.nativeElement.classList.contains('show')) {
    //   this.dropdownMenu.nativeElement.classList.remove('show');
    // }

     // @ts-ignore
    //  if (data && data.value === 'Not Authorized') {
    //  this.matsnackbar.open('Wrong Username or Password Enter , try Again', '', {
    //      duration: 3000,
    //      panelClass: ['error-snackbar']
    //   });
    //    this.retryError = true;

    //  } else if(this.loginData && this.loginData.value  === 'Inactive'){
    
    //    this.retryError = true;
    //  } else {
     
    //    if (data && data.value === 'Another User LoggedIn') {
    //      this.matsnackbar.open('Another User LoggedIn', '', {
    //        duration: 3000,
    //        panelClass: ['error-snackbar']
    //      });
    //      } else {
    //     //    this.snackBar.open('Login Successfully', '', {
    //     //      duration: 3000,
    //     //      panelClass: ['success-snackbar']
    //     //  });
    //      this.router.navigate(['/dashboard'], { relativeTo: this.route.parent });

    //  }}
   }, 
   //(error => {
    // this.matsnackbar.open('Please Enter correct details', '', {
    //   duration: 3000,
    //   panelClass: ['error-snackbar']
      
 //   });
  // })
   );
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
}
