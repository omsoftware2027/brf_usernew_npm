import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/shared/signin-popup/signin-popup.component';
import { DashboardService } from '../dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  carttotal:any;
  data:any;
  userid:any;
  proccedaddressform!:FormGroup;
  shippingaddress:any
  currentPage=0;
  pageSize=30;
constructor( private dialog:MatDialog,private dashboardservice:DashboardService,private matSnackBar:MatSnackBar,private formBuilder:FormBuilder){

}
ngOnInit(): void {
  this.getallcarttotal(0);
  this.shippingcard(0);
  this.proccedaddressform = this.formBuilder.group({
    shippingAddressId: [''],
    dateTime: ['', []],
    notes:[''],
    shippingAddressType:[''],

  });
}
  openeclinicAcessDialog(): void {
    this.dialog.open(SigninPopupComponent, {
      width: '1000px',
     
    });
  }
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
     
    let data = {
      userId: this.userid,
      shippingAddressId:this.proccedaddressform.value.shippingAddressId,
      dateTime:this.proccedaddressform.value.dateTime,
      notes:this.proccedaddressform.value.notes,
      shippingAddressType:this.proccedaddressform.value.shippingAddressType,

   
    }
    this.dashboardservice.saveaddress(data).subscribe((res) => {
      if (res.status == 0) {
        this.matSnackBar.open(res.response );
      }
      else {
        this.matSnackBar.open("Error while place the order", 'x', { duration: 2000 });
      }
    })
  
  }
}
