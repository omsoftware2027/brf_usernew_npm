import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  shippingAddressId:any;
  addOnUpdate:boolean=false;
  accountTypeRes:any;

  constructor( private formBuilder:FormBuilder,private dialogRef: MatDialogRef<SigninPopupComponent>,private dashboardservice:DashboardService,private matSnackBar:MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any){

  }
  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      address: [''],
      city: [''],
      country:[''],
      pincode:[''],
      state:[''],
    });
    console.log(this.data.id,"id");
    this.shippingAddressId=this.data.id ;
    if(this.shippingAddressId ){
      this.getaccountdetailById(this.shippingAddressId);
    }
    
  }
  closeDialog(){
  this.dialogRef.close();
}
shppingaddress(){
  this.userid=localStorage.getItem('id');
  if(this.addOnUpdate){
    let data = {
      userId: this.userid,
      address:this.formGroup.value.address,
      city:this.formGroup.value.city,
      country:this.formGroup.value.country,
      pincode:this.formGroup.value.pincode,
      state:this.formGroup.value.state,
      shippingAddressId:this.shippingAddressId
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
  }else{
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
getaccountdetailById(shippingAddressId:any){
  this.dashboardservice.getshppingsddressbyid(shippingAddressId).subscribe((res:any)=>{
    if(res.status == 0){
      console.log(res,"Response");
      this.accountTypeRes = res.response
      this.addOnUpdate = true;
      this.formGroup.patchValue({
        address: this.accountTypeRes.address,
        city:this.accountTypeRes.city,
        state:this.accountTypeRes.state,
        country:this.accountTypeRes.country,
        pincode:this.accountTypeRes.pincode,



      })
    }
  })
}
}
