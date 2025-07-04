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

searchText: string = '';
wishlist: any[] = [];
filteredWishlist: any[] = [];
  userDetails: any;
  userid: any;
  page: number = 0;
  size: number = 30;
  currentPage = 0;
  pageSize = 30;
  totalrecordLength: any;

  displayedColumns: string[] = ['productTitle']; // Add more columns as needed

  constructor(
    private matSnackBar: MatSnackBar,
    private dashboardservice: DashboardService,
    private reloadCommonService: MasterService
  ) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('UserDetails') || '{}');
    this.tabelLoad(0);
  }

 tabelLoad(page: number): void {
  const userIdFromStorage = localStorage.getItem('id');
  this.userid = userIdFromStorage !== null ? userIdFromStorage : 0;

  this.dashboardservice.getallwishlist(this.currentPage, this.pageSize, this.userid).subscribe({
    next: (res: any) => {
      if (res.status === 0) {
        window.scrollTo(0, 0);
        this.totalrecordLength = res.response.totalElements;
        this.wishlist = res.response.dataSet || [];
        this.filteredWishlist = [...this.wishlist];

        // Apply active search filter if any
        if (this.searchText?.trim()) {
          this.applyFilter();
        }

        setTimeout(() => {
          if (this.paginator) {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = this.totalrecordLength;
          }
        });
      } else {
        this.matSnackBar.open("Something went wrong!", 'x', { duration: 2000 });
      }
    },
    error: () => {
      this.matSnackBar.open("Error fetching wishlist.", 'x', { duration: 2000 });
    }
  });
}


  applyFilter() {
    const lowerSearch = this.searchText.toLowerCase();
    this.filteredWishlist = this.wishlist.filter(product =>
      product.productTitle.toLowerCase().includes(lowerSearch)
    );
  }

  deletewishlist(id: any) {
    if (confirm("Are you sure you want to remove from wishlist?")) {
      this.dashboardservice.deletewishlist(id).subscribe(res => {
        if (res.status === 0) {
          this.tabelLoad(0);
          this.reloadCommonService.sendUpdate('reloadWalletDetail');
        }
      });
    }
  }

  updateQuantity(ev: any, data: any) {
    data.quantity = ev.target.value;
  }

  submitcart(productId: any, price: any, quantity: any, wishlistId: any) {
    const data = {
      productId,
      userId: this.userid,
      quantity: quantity ? quantity : 1,
      weight: 0,
      shipping: 0,
      price
    };
    this.dashboardservice.savewishcart(data).subscribe(res => {
      if (res.status === 0) {
        this.tabelLoad(0);
        this.reloadCommonService.sendUpdate('reloadWalletDetail');
        this.matSnackBar.open("Added To Cart", 'x', { duration: 2000 });
      } else {
        this.matSnackBar.open("Error while updating", 'x', { duration: 2000 });
      }
    });
  }

  decrementValue(data: any): void {
    if (data.quantity && data.quantity > 0) {
      data.quantity -= 1;
    }
  }

  incrementValue(data: any): void {
    data.quantity = (data.quantity || 0) + 1;
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.tabelLoad(this.currentPage);
  }
}
