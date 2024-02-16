import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/shared/signin-popup/signin-popup.component';
import { DashboardService } from '../dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
constructor( private dialog:MatDialog,private dashboardservice:DashboardService,private matSnackBar:MatSnackBar,private formBuilder:FormBuilder,private route:Router){

}
ngOnInit(): void {
  this.getallcarttotal(0);
  this.shippingcard(0);
  const datePipe = new DatePipe('en-Us');
  this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
  this.proccedaddressform = this.formBuilder.group({
    shippingAddressId: ['',Validators.required],
    dateTime: ['', Validators.required],
    notes:[''],
    shippingAddressType:[''],

  });
  const now = new Date();
  this.now = now.toISOString().slice(0, 16);
}
  // openeclinicAcessDialog(): void {
  //   this.dialog.open(SigninPopupComponent, {
  //     width: '1000px',
     
  //   });
  // }
  getallcarttotal(page: number) {
    this.userid=localStorage.getItem('id');
    console.log(this.userid,'userid')
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
    console.log(this.userid,'userid')
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
        this.route.navigate(['/dashboard/order-detail-complated', this.orderpalceid])
        this.matSnackBar.open(res.response ,'x', { duration: 2000 });

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
      height: '584px',
    });
  
    // Subscribe to the afterClosed event
    dialogRef.afterClosed().subscribe(result => {
      // This code will be executed when the dialog is closed
      // You can call your API or perform any other action here
      this.shippingcard(0);
    });
  }
}
