import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../dashboard.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-wishlist',
  templateUrl: './add-wishlist.component.html',
  styleUrls: ['./add-wishlist.component.scss']
})
export class AddWishlistComponent {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  currentValue: number = 22;
  wishlist:any;
  data:any;
  userid:any;
  page: number = 0;
  size: number = 30;
  currentPage = 0;
  pageSize = 100;
  totalrecordLength:any;


  incrementValue() {
    this.currentValue += 1;
  }

  decrementValue() {
    this.currentValue -= 1;
  }
  constructor(private matSnackBar:MatSnackBar,private dashboardservice:DashboardService) { }

  ngOnInit(): void {
    this.tabelLoad(0);

   
  }
  tabelLoad(page: number) {
    this.userid=localStorage.getItem('id');
    console.log(this.userid,'userid')
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
    if (confirm("Are you sure wants to delete this Product?") == true) {
      this.dashboardservice.deletewishlist(id).subscribe(res => {
        if (res.status == 0) {
          this.tabelLoad(0);
        }
      })
    }
  }
  submitcart(productId:any,price:any){
     
    let data = {
      productId:productId,
      userId: this.userid,
      quantity:1,
      weight:0,
      shipping:0,
      price:price
   
    }
    this.dashboardservice.savewishcart(data).subscribe((res) => {
      if (res.status == 0) {
        this.matSnackBar.open("Added To Cart", 'x', { duration: 2000 });
      
      }
      else {
        this.matSnackBar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
  
  }
}
