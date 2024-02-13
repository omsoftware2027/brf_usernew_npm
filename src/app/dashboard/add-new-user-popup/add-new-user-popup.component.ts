import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-add-new-user-popup',
  templateUrl: './add-new-user-popup.component.html',
  styleUrls: ['./add-new-user-popup.component.scss']
})
export class AddNewUserPopupComponent {
  SignUpForm!:FormGroup;
  userId:any;
  constructor( private formBuilder:FormBuilder,private dialogRef: MatDialogRef<AddNewUserPopupComponent>,private matsnackbar:MatSnackBar,private dashboardservice :DashboardService){

  }
  ngOnInit(){
    this.SignUpForm = this.formBuilder.group({
      email: [''],
      firstName: [''],
      lastName:[''],
      mobile:[''],
      parentId:['']
    });


  
  }
  closeDialog(){
    this.dialogRef.close();
  }
  submit(){
    this.userId=localStorage.getItem('id');
    let data = {
      email: this.SignUpForm.value.email,
      firstName: this.SignUpForm.value.firstName,
      mobile:this.SignUpForm.value.mobile,
      lastName:this.SignUpForm.value.mobile,
      parentId: this.userId,
    }
    this.dashboardservice.signup(data).subscribe((res) => {
      if (res.status == 0) {
        this.matsnackbar.open("User Added ", 'x', { duration: 2000 });
        this.dialogRef.close();
      }
      else {
        this.matsnackbar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
  
  }
}
