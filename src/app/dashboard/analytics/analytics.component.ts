import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from '../dashboard.service';
import { BannerService } from 'src/app/banner.service';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master-service/master.service';
declare var bootstrap: any;
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  currentValue: number = 22;
  category:any;
  carttotal:any;
  userid:any;
  userId:any;
  data:any;
  wishlist:any;
  fwishcart:any;
  fwishlist:any;
  page: number = 0;
  size: number = 30;
  currentPage = 0;
  pageSize = 100;
  totalrecordLength:any;
  banners: any[] = [];
  showNoBanner: boolean = false;
 public homeTopBanners: any[] = [];
 homeBannersLoaded: boolean = false;
public productTopBanners: any[] = [];
public homeBottomBanners: any[] = [];
public homeRightBanners: any[] = [];
currentHomeBannerIndex: number = 0;
bannerInterval: any;
firstTimeLogin: string | null = null;



 
  constructor(private matSnackBar:MatSnackBar,private dashboardservice:DashboardService, private bannerService: BannerService, private router: Router, public reloadCommonService:MasterService) { }

  ngOnInit(): void {
    this.tabelLoad(0);
    this.getallcarttotal(0);
    this.cardload(0);
    this.getallcount()
    this.getBanners();
    // this.reloadCommonService.sendUpdate('reloadWalletDetail');
    this.reloadCommonService.sendUpdate('reloadNavbar');
    
 setTimeout(() => {
    if (!this.homeTopBanners || this.homeTopBanners.length === 0) {
      this.showNoBanner = true;
    }
  }, 1050);

      setTimeout(() => {
      this.firstTimeLogin = localStorage.getItem('firstTimeLogin');
      if (this.firstTimeLogin == 'true') {
        this.router.navigateByUrl('/account-detail');
      }
    }, 6000);
   
    
  }
 startAutoSlide() {
  this.bannerInterval = setInterval(() => {
    if (this.homeTopBanners.length > 0) {
      this.currentHomeBannerIndex = (this.currentHomeBannerIndex + 1) % this.homeTopBanners.length;
    }
  }, 3000); // Slide every 3 seconds
}
  
  tabelLoad(page: number) {
    this.dashboardservice.getAllcategoryy().subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        window.scrollTo(0, 0);
        this.totalrecordLength = this.data.response.totalElements;
        this.category = this.data.response.dataSet;
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
  
  

getBanners() {
  this.bannerService.getBanners().subscribe({
    next: (res) => {
      console.log('Banner response:', res);

      if (res.status === 0 && Array.isArray(res.response) && res.response.length > 0) {
        this.banners = res.response;
        console.log("Loaded banners:", this.banners);

        this.homeTopBanners = this.banners.filter(b =>
          b.bannerPage?.includes('home_page') && b.bannerType === 'top_banner'
        );

        this.homeBottomBanners = this.banners.filter(b =>
          b.bannerPage?.includes('home_page') && b.bannerType === 'Bottom_banner'
        );

        this.homeRightBanners = this.banners.filter(b =>
          b.bannerPage?.includes('home_page') && b.bannerType === 'side_banner_right'
        );
 this.homeBannersLoaded = true;
        // 🔁 Start rotating banners after they are loaded
        this.startAutoSlide();

      } else {
        this.banners = [];
        this.homeBannersLoaded = true;
        // this.matSnackBar.open("No banners found!", 'x', { duration: 2000 });
      }
    },
    error: (err) => {
      console.error('Banner fetch failed:', err);
       this.homeBannersLoaded = true;
      this.matSnackBar.open("Error fetching banners!", 'x', { duration: 2000 });
    }
  });
}


  getallcarttotal(page: number) {
    this.userid=localStorage.getItem('id');
    console.log(this.userid,'userid');
    if(this.userid != null ){
      this.userId =this.userid
    }else{
      this.userId=0
    }
    this.dashboardservice.getallcardtotal(this.currentPage, this.pageSize,this.userId).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        this.carttotal = this.data.response;
      }
      else {
        this.matSnackBar.open("Something went wrong!", 'x', { duration: 2000 })
      }
    })
  }
  cardload(page: number) {
    this.userId=localStorage.getItem('id');
    if(this.userId != null ){
      this.userid =this.userId
    }else{
      this.userid=0
    }
   
    console.log(this.userid,'userid')
    this.dashboardservice.getallcart(this.currentPage, this.pageSize,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
       
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
  incrementValue(data: any): void {
    if (data.quantity === undefined) {
      // If quantity property doesn't exist, initialize it with 1
      data.quantity = 1;
    } else {
      // Increment the quantity
      data.quantity += 1;
    }
  }
  
  decrementValue(data: any): void {
    if (data.quantity === undefined || data.quantity <= 0) {
      // If quantity property doesn't exist or is already 0, do nothing
      return;
    } else {
      // Decrement the quantity
      data.quantity -= 1;
    }
  }
  deletewishlist(id:any) {
    if (confirm("Are you sure wants to delete this Product?") == true) {
      this.dashboardservice.deletecard(id).subscribe(res => {
        if (res.status == 0) {
          this.reloadCommonService.sendUpdate('reloadWalletDetail');
          this.cardload(0);
          this.getallcarttotal(0);
          this.getallcount();
          this.getallcart();
        }
      })
    }
  }
  savequantity(productId:any,quantity:any){
    this.userid=localStorage.getItem('id');
    this.dashboardservice.savequtanity( this.userid,productId,quantity).subscribe((res:any) => {
      if (res.status == 0) {
        this.reloadCommonService.sendUpdate('reloadWalletDetail');
        this.matSnackBar.open("Quantity Update ", 'x', { duration: 2000 });
        this.getallcarttotal(0);
        this.cardload(0);
      }
      else {
        this.matSnackBar.open(res.response, 'x', { duration: 2000 });
      }
    })
  
  }
  getallcount() {
    this.userid=localStorage.getItem('id');
    if(this.userid == null){
      this.userid = 0;
    }
    this.dashboardservice.getcountcart(this.userid).subscribe(res => {
        this.data = res;
        if (this.data.status === 0) {  
            this.fwishlist = this.data.response;
            
        } else {
            // Handle other cases if needed
        }
    });
}
getallcart() {
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getcartcount(this.userid).subscribe(res => {
      this.data = res;
      if (this.data.status === 0) {  
          this.fwishcart = this.data.response;
          
      } else {
          // Handle other cases if needed
      }
  });
}
}
