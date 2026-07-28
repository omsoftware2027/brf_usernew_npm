import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  formGroup!:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private dialogRef: MatDialogRef<SignInComponent>,
    private router: Router,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ){

  }
  ngOnInit() {
 
    this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
   
}
closeDialog(){
  this.dialogRef.close();

}
logout(){
  this.dialogRef.close();
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('token');
  }
  this.authService.clearToken();
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('id');
  }
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('userType');
  }
  this.authService.clearUserType();
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('firstTimeLogin')
  }
  this.dialogRef.close();
  this.router.navigate(['/email-signup']);
  }
}
