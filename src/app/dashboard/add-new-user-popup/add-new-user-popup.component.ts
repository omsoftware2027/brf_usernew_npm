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
  submitted:boolean=false;
  constructor( private formBuilder:FormBuilder,private dialogRef: MatDialogRef<AddNewUserPopupComponent>,private matsnackbar:MatSnackBar,private dashboardservice :DashboardService){

  }
  ngOnInit(){
    this.SignUpForm = this.formBuilder.group({
      email: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName:[''],
      mobile:['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      parentId:['']
    });


  
  }
  closeDialog(){
    this.dialogRef.close();
  }
  submit(){
    this.userId=localStorage.getItem('id');
    this.submitted=true;
    if(this.SignUpForm.valid){
      let data = {
        email: this.SignUpForm.value.email,
        firstName: this.SignUpForm.value.firstName,
        mobile:this.SignUpForm.value.mobile,
        lastName:this.SignUpForm.value.lastName,
        parentId: this.userId,
      }
      this.dashboardservice.signup(data).subscribe((res) => {
        if (res.status == 0) {
          this.matsnackbar.open("User Added ", 'x', { duration: 2000 });
          this.dialogRef.close();
        }
        else {
          this.matsnackbar.open(res.response, 'x', { duration: 2000 });
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
}
