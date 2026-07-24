import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../dashboard.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MasterService } from 'src/app/services/master-service/master.service';
import { BannerService } from 'src/app/banner.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

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
  currentPage = 0;
  pageSize = 35000;
  totalrecordLength: any;
  bannerInterval: any;
  banners: any[] = [];
  wishlistTopBanners: any[] = [];
  wishlistBottomBanners: any[] = [];
  rightBanners: any[] = [];
  leftBanners: any[] = [];
  currentTopBannerIndex = 0;
  currentBottomBannerIndex = 0;
  wishlistBannersLoaded: boolean = false;

  displayedColumns: string[] = ['productTitle']; // Add more columns as needed

  constructor(
    private matSnackBar: MatSnackBar,
    public dashboardservice: DashboardService,
    private reloadCommonService: MasterService,
    private bannerService: BannerService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.authService.token$.subscribe(token => {
      if (!token || token.length<1) {
        this.router.navigate(['/email-signup']);
      }
    });
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('UserDetails') || '{}');
    this.tabelLoad(0);
    this.getBanners();          // <-- Fetch banners on init
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
  if (this.bannerInterval) {
    clearInterval(this.bannerInterval);
  }
}

 tabelLoad(page: number): void {
  const userIdFromStorage = localStorage.getItem('id');
  this.userid = userIdFromStorage !== null ? userIdFromStorage : 0;

  this.dashboardservice.getallwishlist(this.currentPage, this.pageSize, this.userid, '').subscribe({
    next: (res: any) => {
      if (res.status === 0) {
        // window.scrollTo(0, 0);
        this.totalrecordLength = res?.response?.totalElements;
        this.wishlist = res?.response?.dataSet || [];
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


startAutoSlide() {
  this.bannerInterval = setInterval(() => {
    // Top Banner
    if (this.wishlistTopBanners.length > 1) {
      this.currentTopBannerIndex =
        (this.currentTopBannerIndex + 1) % this.wishlistTopBanners.length;
    }
    // Bottom Banner
    if (this.wishlistBottomBanners.length > 1) {
      this.currentBottomBannerIndex =
        (this.currentBottomBannerIndex + 1) % this.wishlistBottomBanners.length;
    }
  }, 3000);
}



  getBanners() {
    this.bannerService.getBanners().subscribe({
      next: (res) => {
        if (res.status === 0 && Array.isArray(res.response) && res.response.length > 0) {
          this.banners = res.response;
          this.wishlistTopBanners = this.banners.filter(b =>
            b.bannerPage?.includes('order_guide') && b.bannerType === 'top_banner'
          );

          this.wishlistBottomBanners = this.banners.filter(b =>
            b.bannerPage?.includes('order_guide') && (b.bannerType === 'bottom_banner' || b.bannerType === 'Bottom_banner')
          );

          this.rightBanners = this.banners.filter(b =>
            b.bannerPage?.includes('order_guide') && b.bannerType === 'side_banner_right'
          );

          // DEAR DEVELOPER- RIGHT N LEFT BANNER IMPLEMENTATION IS COMPLETED...JUST UNCOMMENT BELOW LEFTBANNERs[] CODE FOR SHOWING LEFT BANNER...HTML OK HAI

          // this.leftBanners = this.banners.filter(b =>
          //   b.bannerPage?.includes('order_guide') && b.bannerType === 'side_banner_left'
          // );

        } else {
          this.banners = [];
        }
      },
      error: (err) => {
        this.matSnackBar.open("Error fetching banners!", 'x', { duration: 2000 });
      }
    });
  }


  getWishlist() {
    this.dashboardservice.getallwishlist(this.currentPage, this.pageSize, this.userid, '').subscribe({
      next: (res: any) => {
        if (res.status === 0) {
          this.totalrecordLength = res.response.totalElements;
          this.wishlist = res.response.dataSet || [];
          this.filteredWishlist = [...this.wishlist];

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
  if (!this.searchText || !this.searchText.trim()) {
    this.getWishlist();
    return;
  }
  this.dashboardservice.searchWishlist(this.userid, this.searchText.trim()).subscribe({
    next: (res: any) => {
      if (res.status === 0) {
        this.filteredWishlist = res.response.dataSet || [];
      }
    },
    error: () => {
      this.matSnackBar.open("Error searching wishlist.", 'x', { duration: 2000 });
    }
  })
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
    let quan = ev.target.value;
    if (!quan || isNaN(quan) || quan < 1) {
      this.matSnackBar.open('Minimum quantity should be 1', 'x', { duration: 2000 });
    }
    data.quantity = quan;
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
      if (data.quantity == 1) {
        this.matSnackBar.open('Minimum quantity should be 1', 'x', { duration: 2000 });
        return;
      }
      data.quantity -= 1;
    }
  }

  incrementValue(data: any): void {
    data.quantity = Number(data.quantity || 0) + 1;
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.tabelLoad(this.currentPage);
  }


  get hasLeftBanners(): boolean {
    return this.leftBanners?.length > 0;
  }
  get hasRightBanners(): boolean {
    return this.rightBanners?.length > 0;
  }
  get leftColumnClass(): string {
    return this.hasRightBanners ? 'col-lg-3' : 'col-lg-4';
  }
  get rightColumnClass(): string {
    return this.hasLeftBanners ? 'col-lg-3' : 'col-lg-4';
  }
  get centerColumnClass(): string {
    if (this.hasLeftBanners && this.hasRightBanners) {
      return 'col-lg-6';
    }
    if (this.hasLeftBanners || this.hasRightBanners) {
      return 'col-lg-8';
    }
    return 'col-lg-12';
  }
}
