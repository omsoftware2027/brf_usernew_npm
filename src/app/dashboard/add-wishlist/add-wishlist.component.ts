import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../dashboard.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MasterService } from 'src/app/services/master-service/master.service';

@Component({
  selector: 'app-add-wishlist',
  templateUrl: './add-wishlist.component.html',
  styleUrls: ['./add-wishlist.component.scss']
})
export class AddWishlistComponent {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  currentValue: number = 22;
  // totalrecordLength:any;
  wishlist:any;
  data:any;
  userid:any;
  page: number = 0;
  size: number = 30;
  currentPage = 0;
  pageSize = 30;
  totalrecordLength:any;
  userDetails:any;

  constructor(private matSnackBar:MatSnackBar,private dashboardservice:DashboardService,private reloadCommonService:MasterService) { }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('UserDetails');
    this.userDetails = JSON.parse(this.userDetails);
    this.tabelLoad(0);
  }
  tabelLoad(page: number) {
    this.userid=localStorage.getItem('id');
    console.log(this.userid,'userid')
    if(this.userid == null){
      this.userid = 0;
    }
    this.dashboardservice.getallwishlist(this.currentPage, this.pageSize,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        window.scrollTo(0, 0);

        this.totalrecordLength = this.data.response.totalElements;
        this.wishlist = this.data.response.dataSet;
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
  deletewishlist(id:any) {
    if (confirm("Are you sure wants to remove form wishlist ?") == true) {
      this.dashboardservice.deletewishlist(id).subscribe(res => {
        if (res.status == 0) {
          this.tabelLoad(0);
          this.reloadCommonService.sendUpdate('reloadWalletDetail');
        }
      })
    }
  }

  updateQuantity(ev:any,data:any){
    var quan = ev.target.value;
    data.quantity = quan;
  }

  submitcart(productId:any,price:any,quantity:any,wishlistId:any){
    let data = {
      productId:productId,
      userId: this.userid,
      quantity:quantity,
      weight:0,
      shipping:0,
      price:price
    }
    this.dashboardservice.savewishcart(data).subscribe((res) => {
      if (res.status == 0) {
        this.tabelLoad(0);
        this.reloadCommonService.sendUpdate('reloadWalletDetail');
        this.matSnackBar.open("Added To Cart", 'x', { duration: 2000 });
        // this.dashboardservice.deletewishlist(wishlistId).subscribe(res => {
        //   if (res.status == 0) {
        //     this.tabelLoad(0);
        //     this.reloadCommonService.sendUpdate('reloadWalletDetail');
        //   }
        // })
      }
      else {
        this.matSnackBar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
  }

  decrementValue(data: any): void {
    if (data.quantity === undefined || data.quantity <= 0) {
      return;
    } else {
      data.quantity -= 1;
    }
  }

  incrementValue(data: any): void {
    if (data.quantity === undefined) {
      // If quantity property doesn't exist, initialize it with 1
      data.quantity = 1;
    } else {
      // Increment the quantity
      data.quantity += 1;

    }
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    // const calculatedPageIndex = this.currentPage * this.pageSize;
    this.tabelLoad(event.pageIndex);
  }

}
