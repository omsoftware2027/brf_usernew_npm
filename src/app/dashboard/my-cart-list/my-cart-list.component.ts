import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from '../dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MasterService } from 'src/app/services/master-service/master.service';
import { BannerService } from 'src/app/banner.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/services/seo/seo.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-my-cart-list',
  templateUrl: './my-cart-list.component.html',
  styleUrls: ['./my-cart-list.component.scss']
})
export class MyCartListComponent {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  totalrecordLength:any;
  data:any;
  wishlist:any
  currentPage=0;
  userid:any;
  carttotal:any;
  pageSize=35000;
  isLogin:any = false;
  banners: any[] = [];
  cartTopBanners: any[] = [];
  cartBottomBanners: any[] = [];
  currentcartBannerIndex = 0;
  bannerInterval: any;

 constructor(
  public dashboardservice:DashboardService,
  private matSnackBar:MatSnackBar,
  private reloadCommonService:MasterService,
  private bannerService: BannerService,
  public authService: AuthService,
  private router: Router,
  private seoService: SeoService,
  @Inject(PLATFORM_ID) private platformId: Object
){

 }
 ngOnInit(){
  // var token = localStorage.getItem('token');
  // if(token){ this.isLogin = true; }

  this.seoService.setDefaultSeo();

  this.authService.token$.subscribe(token => {
    if (token) {
      this.isLogin = true;
    } else {
      this.router.navigate(['/email-signup']);
    }
  });
  this.tabelLoad(0);
  this.getallcarttotal(0)
  this.getBanners();           // fetch banners
  this.startAutoSlide(); 
 }
  currentValue: number = 22;
  
  tabelLoad(page: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.userid=localStorage.getItem('id');
    }
    if(this.userid == null){
      this.userid = 0 ;
     }
    this.dashboardservice.getallcart(this.currentPage, this.pageSize,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        // window.scrollTo(0, 0);
        this.totalrecordLength = this.data.response.totalElements;
        this.wishlist = this.data.response.dataSet;
        this.getallcarttotal(0);
      }
      else {
        this.matSnackBar.open("Something went wrong!", 'x', { duration: 2000 })
      }
    })
  }


  startAutoSlide() {
  this.bannerInterval = setInterval(() => {
    if (this.cartTopBanners.length > 0) {
      this.currentcartBannerIndex = (this.currentcartBannerIndex + 1) % this.cartTopBanners.length;
    }
  }, 3000); // Slide every 3 seconds
}



  getBanners() {
    this.bannerService.getBanners().subscribe({
      next: (res) => {
        if (res.status === 0 && Array.isArray(res.response) && res.response.length > 0) {
          this.banners = res.response;
          this.cartTopBanners = this.banners.filter(b =>
            b.bannerPage?.includes('my_cart') && b.bannerType === 'top_banner'
          );

          this.cartBottomBanners = this.banners.filter(b =>
            b.bannerPage?.includes('my_cart') && b.bannerType === 'bottom_banner'
          );
        } else {
          this.banners = [];
          // this.matSnackBar.open("No banners found!", 'x', { duration: 2000 });
        }
      },
      error: (err) => {
        this.matSnackBar.open("Error fetching banners!", 'x', { duration: 2000 });
      }
    });
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
    if (data.quantity === undefined || data.quantity <= 1) {
      this.matSnackBar.open('Minimum quantity should be 1', 'x', { duration: 2000 });
      // this.reloadCommonService.sendUpdate('reloadWalletDetail');
      // If quantity property doesn't exist or is already 0, do nothing
      return;
    } else {
      // Decrement the quantity
      data.quantity -= 1;
      this.submitcart2(data);
      this.reloadCommonService.sendUpdate('reloadWalletDetail');
    }
  }
  getallcarttotal(page: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.userid=localStorage.getItem('id');
    }
    if(this.userid == null){
      this.userid = 0 ;
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

  submitcart(product:any,quantity:any,type:any){
    var quan:any;
    if(type == 'input'){
      quan = quantity.target.value;
    } else{
      quan = quantity;
    }
    if (!quan || isNaN(quan) || quan < 1) {
      this.matSnackBar.open('Minimum quantity should be 1', 'x', { duration: 2000 });
      quan = product.quantity;
      quantity.target.value = quan;
      return
    } else {
      if (isPlatformBrowser(this.platformId)) {
        this.userid=localStorage.getItem('id');
      }
    this.dashboardservice.savequtanity( this.userid,product?.productId,quan).subscribe((res:any) => {
      if (res.status == 0) {
        this.reloadCommonService.sendUpdate('reloadWalletDetail');
        this.matSnackBar.open("Quantity Added", 'x', { duration: 2000 });
        this.tabelLoad(0);
        this.getallcarttotal(0);

      }
      else {
        this.matSnackBar.open(res.response, 'x', { duration: 2000 });
      }
    })
  }
  
  }
  submitcart2(data: any){
    let quan = Number(data.quantity);
    if (!quan || isNaN(quan) || quan < 1) {
      this.matSnackBar.open('Minimum quantity should be 1', 'x', { duration: 2000 });
      return
    } else {
      if (isPlatformBrowser(this.platformId)) {
        this.userid=localStorage.getItem('id');
      }
    this.dashboardservice.savequtanity( this.userid,data.productId,data.quantity).subscribe((res:any) => {
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

  checkEmptyQuantity(){

  }

}
