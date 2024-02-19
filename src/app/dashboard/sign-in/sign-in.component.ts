import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  formGroup!:FormGroup;
  constructor(private formBuilder:FormBuilder, private dialogRef: MatDialogRef<SignInComponent>,private router: Router){

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
  localStorage.removeItem('id');
  this.dialogRef.close();
  this.router.navigate(['/dashboard']);
  
}
}
