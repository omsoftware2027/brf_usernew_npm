import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signin-popup',
  templateUrl: './signin-popup.component.html',
  styleUrls: ['./signin-popup.component.scss']
})
export class SigninPopupComponent {
  formGroup!:FormGroup
  constructor( private formBuilder:FormBuilder,private dialogRef: MatDialogRef<SigninPopupComponent>){

  }
  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  closeDialog(){
  this.dialogRef.close();
}
}
