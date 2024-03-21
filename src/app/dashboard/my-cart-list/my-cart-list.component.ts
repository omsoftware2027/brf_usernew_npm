import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from '../dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MasterService } from 'src/app/services/master-service/master.service';

@Component({
  selector: 'app-my-cart-list',
  templateUrl: './my-cart-list.component.html',
  styleUrls: ['./my-cart-list.component.scss']
})
export class MyCartListComponent {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  totalrecordLength:any;
  data:any;
  wishlist:any
  currentPage=0;
  userid:any;
  carttotal:any;
  pageSize=30;
 constructor(private dashboardservice:DashboardService,private matSnackBar:MatSnackBar,private reloadCommonService:MasterService){

 }
 ngOnInit(){
  this.tabelLoad(0);
  this.getallcarttotal(0)
 }
  currentValue: number = 22;
  
  tabelLoad(page: number) {
    this.userid=localStorage.getItem('id');
    console.log(this.userid,'userid')
    if(this.userid == null){
      this.userid = 0 ;
     }
    this.dashboardservice.getallcart(this.currentPage, this.pageSize,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        window.scrollTo(0, 0);
        this.totalrecordLength = this.data.response.totalElements;
        this.wishlist = this.data.response.dataSet;
        this.getallcarttotal(0);
        
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;   
          this.paginator.length = this.totalrecordLength;
        });
      }
      else {
        this.matSnackBar.open("Something went wrong!", 'x', { duration: 2000 })
      }
    })
  }
  incrementValue(data: any): void {
    if (data.quantity === undefined) {
      // If quantity property doesn't exist, initialize it with 1
      data.quantity = 1;
      this.reloadCommonService.sendUpdate('reloadWalletDetail');
    } else {
      // Increment the quantity
      data.quantity += 1;
      this.reloadCommonService.sendUpdate('reloadWalletDetail');

    }
  }
  
  decrementValue(data: any): void {
    if (data.quantity === undefined || data.quantity <= 0) {
      this.reloadCommonService.sendUpdate('reloadWalletDetail');
      // If quantity property doesn't exist or is already 0, do nothing
      return;
    } else {
      // Decrement the quantity
      data.quantity -= 1;
      this.reloadCommonService.sendUpdate('reloadWalletDetail');
    }
  }
  getallcarttotal(page: number) {
    this.userid=localStorage.getItem('id');
    if(this.userid == null){
      this.userid = 0 ;
     }
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
  submitcart(productId:any,quantity:any){
    this.userid=localStorage.getItem('id');
    this.dashboardservice.savequtanity( this.userid,productId,quantity).subscribe((res:any) => {
      if (res.status == 0) {
        this.matSnackBar.open("Quantity Added", 'x', { duration: 2000 });
        this.tabelLoad(0);
        this.getallcarttotal(0);

      }
      else {
        this.matSnackBar.open(res.response, 'x', { duration: 2000 });
      }
    })
  
  }
  submitcart2(productId:any,quantity:any){
    this.userid=localStorage.getItem('id');
    this.dashboardservice.savequtanity( this.userid,productId,quantity).subscribe((res:any) => {
      if (res.status == 0) {
        this.matSnackBar.open("Quantity Removed", 'x', { duration: 2000 });
        this.tabelLoad(0);
        this.getallcarttotal(0);

        
      }
      else {
        this.matSnackBar.open(res.response, 'x', { duration: 2000 });
      }
    })
  
  }
  deletewishlist(id:any) {
    if (confirm("Are you sure wants to remove form the cart list?") == true) {
      this.dashboardservice.deletecard(id).subscribe(res => {
        if (res.status == 0) {
          this.tabelLoad(0);
          this.reloadCommonService.sendUpdate('reloadWalletDetail');

        }
      })
    }
  }
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    // const calculatedPageIndex = this.currentPage * this.pageSize;
    this.tabelLoad(event.pageIndex);
  }

}
