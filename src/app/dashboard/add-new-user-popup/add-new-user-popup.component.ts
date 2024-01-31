import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-user-popup',
  templateUrl: './add-new-user-popup.component.html',
  styleUrls: ['./add-new-user-popup.component.scss']
})
export class AddNewUserPopupComponent {
  formGroup!:FormGroup
  constructor( private formBuilder:FormBuilder,private dialogRef: MatDialogRef<AddNewUserPopupComponent>){

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
