import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../dashboard.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MasterService } from 'src/app/services/master-service/master.service';
import { BannerService } from 'src/app/banner.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo/seo.service';
import { isPlatformBrowser } from '@angular/common';

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
  currentwishlistBannerIndex = 0;
  wishlistBannersLoaded: boolean = false;

  displayedColumns: string[] = ['productTitle']; // Add more columns as needed

  constructor(
    private matSnackBar: MatSnackBar,
    public dashboardservice: DashboardService,
    private reloadCommonService: MasterService,
    private bannerService: BannerService,
    private authService: AuthService,
    private router: Router,
    public seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.authService.token$.subscribe(token => {
      if (!token || token.length<1) {
        this.router.navigate(['/email-signup']);
      }
    });
  }

  ngOnInit(): void {
    this.seoService.setDefaultSeo();
    if (isPlatformBrowser(this.platformId)) {
      this.userDetails = JSON.parse(localStorage.getItem('UserDetails') || '{}');
    }
    this.tabelLoad(0);
    this.getBanners();          // <-- Fetch banners on init
  }

  ngOnDestroy(): void {
  if (this.bannerInterval) {
    clearInterval(this.bannerInterval);
  }
}

 tabelLoad(page: number): void {
  if (isPlatformBrowser(this.platformId)) {
    const userIdFromStorage = localStorage.getItem('id');
    this.userid = userIdFromStorage !== null ? userIdFromStorage : 0;
  }
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
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            if (this.paginator) {
              this.paginator.pageIndex = this.currentPage;
              this.paginator.length = this.totalrecordLength;
            }
          });
        }
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
  if (!isPlatformBrowser(this.platformId)) {
    return;
  }
  this.bannerInterval = setInterval(() => {
    if (this.wishlistTopBanners.length > 0) {
      this.currentwishlistBannerIndex = (this.currentwishlistBannerIndex + 1) % this.wishlistTopBanners.length;
    }
  }, 3000); // Slide every 3 seconds
}



  getBanners() {
    this.bannerService.getBanners().subscribe({
      next: (res) => {
        if (res?.status === 0 && Array.isArray(res?.response) && res?.response?.length > 0) {
          this.banners = res?.response;
          this.wishlistTopBanners = this.banners.filter(b =>
            b.bannerPage?.includes('order_guide') && b.bannerType === 'top_banner'
          );

          this.wishlistBottomBanners = this.banners.filter(b =>
            b.bannerPage?.includes('order_guide') && b.bannerType === 'Bottom_banner'
          );
        this.wishlistBannersLoaded = true;
          this.startAutoSlide();
  
        } else {
          this.banners = [];
          this.wishlistBannersLoaded = true;
          // this.matSnackBar.open("No banners found!", 'x', { duration: 2000 });
        }
      },
      error: (err) => {
        this.wishlistBannersLoaded = true;
        this.matSnackBar.open("Error fetching banners!", 'x', { duration: 2000 });
      }
    });
  }


  getWishlist() {
    this.dashboardservice.getallwishlist(this.currentPage, this.pageSize, this.userid, '').subscribe({
      next: (res: any) => {
        if (res?.status === 0) {
          this.totalrecordLength = res?.response?.totalElements;
          this.wishlist = res?.response?.dataSet || [];
          this.filteredWishlist = [...this.wishlist];
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              if (this.paginator) {
                this.paginator.pageIndex = this.currentPage;
                this.paginator.length = this.totalrecordLength;
              }
            });
          }
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
      if (res?.status === 0) {
        this.filteredWishlist = res?.response?.dataSet || [];
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
}
