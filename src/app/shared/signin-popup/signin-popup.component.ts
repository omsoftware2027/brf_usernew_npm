import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-signin-popup',
  templateUrl: './signin-popup.component.html',
  styleUrls: ['./signin-popup.component.scss']
})
export class SigninPopupComponent {
  formGroup!:FormGroup;
  userid:any;
  constructor( private formBuilder:FormBuilder,private dialogRef: MatDialogRef<SigninPopupComponent>,private dashboardservice:DashboardService,private matSnackBar:MatSnackBar){

  }
  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      address: [''],
      city: [''],
      country:[''],
      pincode:[''],
      state:['']
    });
  }
  closeDialog(){
  this.dialogRef.close();
}
shppingaddress(){
  this.userid=localStorage.getItem('id');
  let data = {
    userId: this.userid,
    address:this.formGroup.value.address,
    city:this.formGroup.value.city,
    country:this.formGroup.value.country,
    pincode:this.formGroup.value.pincode,
    state:this.formGroup.value.state,
    shippingAddressId:0
  }
  this.dashboardservice.saveshippingaddress(data).subscribe((res) => {
    if (res.status == 0) {
      this.matSnackBar.open(res.response );
      this.dialogRef.close();
    }
    else {
      this.matSnackBar.open("Error while updating", 'x', { duration: 2000 });
    }
  })

}
}
