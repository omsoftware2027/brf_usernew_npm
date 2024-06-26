import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/shared/signin-popup/signin-popup.component';
import { DashboardService } from '../dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MasterService } from 'src/app/services/master-service/master.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  DATE = new Date().toISOString().split('T')[0];

  carttotal:any;
  data:any;
  userid:any;
  proccedaddressform!:FormGroup;
  shippingaddress:any;
  orderpalceid:any;
  submitted:boolean=false;
  currentPage=0;
  pageSize=30;
  now:any;
constructor( private dialog:MatDialog,private dashboardservice:DashboardService,private matSnackBar:MatSnackBar,private formBuilder:FormBuilder,private route:Router,private reloadCommonService:MasterService){

}
ngOnInit(): void {
  this.getallcarttotal(0);
  this.shippingcard(0);
  const datePipe = new DatePipe('en-Us');
  this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
  this.proccedaddressform = this.formBuilder.group({
    shippingAddressId: ['',Validators.required],
    dateTime: ['', [Validators.required,this.dateValidator]],
    notes:[''],
    shippingAddressType:[''],

  });
  const now = new Date();
  this.now = now.toISOString().slice(0, 16);
  this.now = new Date(this.now);
  console.log('this.now',this.now)
}

dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control?.value) {
      const today = new Date();
      const dateToCheck = new Date(control.value);
      if (dateToCheck < today) {
          return {'Invalid date': true}
      }
  }
  return null;
}
  // openeclinicAcessDialog(): void {
  //   this.dialog.open(SigninPopupComponent, {
  //     width: '1000px',
     
  //   });
  // }
  getallcarttotal(page: number) {
    this.userid=localStorage.getItem('id');
    console.log(this.userid,'userid');
    if(this.userid == null){
      this.userid = 0;
    }
    this.dashboardservice.getallcardtotal(this.currentPage, this.pageSize,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        this.carttotal = this.data.response;
      }
      else {
        this.matSnackBar.open("Something went wrong!", 'x', { duration: 2000 })
      }
    })
  }
  shippingcard(page: number) {
    this.userid=localStorage.getItem('id');
    console.log(this.userid,'userid');
    if(this.userid == null){
      this.userid = 0;
    }
    this.dashboardservice.getallshppingaddress(this.currentPage, this.pageSize,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        this.shippingaddress= this.data.response.dataSet;
      }
      else {
        this.matSnackBar.open("Something went wrong!", 'x', { duration: 2000 })
      }
    })
  }
  orderplaced(){
    this.submitted = true;
   if( this.proccedaddressform.valid){
    let data = {
      userId: this.userid,
      shippingAddressId:this.proccedaddressform.value.shippingAddressId,
      dateTime:this.proccedaddressform.value.dateTime,
      notes:this.proccedaddressform.value.notes,
      shippingAddressType:this.proccedaddressform.value.shippingAddressType,

   
    }
    this.dashboardservice.saveaddress(data).subscribe((res) => {
      if (res.status == 0) {
        this.orderpalceid=res.response;
        this.reloadCommonService.sendUpdate('reloadWalletDetail');
        this.route.navigate(['/dashboard/order-detail-complated', this.orderpalceid])
        this.matSnackBar.open("Order place  successfully",'x', { duration: 2000 });

      }
      else {
        this.matSnackBar.open("Error while place the order", 'x', { duration: 2000 });
      }
    })
   }
  
  }
  openeclinicAcessDialog(): void {
    // Open the dialog
    const dialogRef: MatDialogRef<SigninPopupComponent> = this.dialog.open(SigninPopupComponent, {
      width: '914px',
      height: '470px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.shippingcard(0);
    });
  }
}
