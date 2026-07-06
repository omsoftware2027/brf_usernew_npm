import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MasterService } from 'src/app/services/master-service/master.service';
import { Location } from '@angular/common';
import { BannerService } from 'src/app/banner.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent implements OnDestroy {
  currentValue: number = 22;
  firstIconDisabled: boolean = true;
  secondIconDisabled: boolean = false;
  productRes:any;
  fwishcart:any
  wishlist:any;
  fwishlist:any;
  qutantity:any;
  userid:any;
  routeSubscription!: Subscription;
  totalrecordLength:any;
  carttotal:any;
  currentPage=0;
  pageSize=30;
  data:any;
  userDetails:any;
  productid:any;
  slug: string = '';
  banners: any[] = [];
  productTopBanners: any[] = [];
  productBottomBanners: any[] = [];
  currentProductBannerIndex = 0;
// productTopBanners: any[] = [];
bannerInterval: any;

  constructor(public dashboardservice:DashboardService,private route: ActivatedRoute ,private matSnackBar:MatSnackBar,private router: Router,private reloadCommonService:MasterService, private location: Location,private bannerService: BannerService ){

  }

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('UserDetails');
    this.userDetails = JSON.parse(this.userDetails);
    this.productid = this.route.snapshot.params['id'];
    this.slug = this.route.snapshot.params['slug'] || 'product name';
    this.userid=localStorage.getItem('id');
    this.routeSubscription = this.route.params.subscribe(params => {
      this.productid = params['id'];
      this.getproductById();
      this.getBanners();
       this.startAutoSlide();
    });
   this.getallcarttotal(0);
   this.cardload(0);
   this.getallcount();
    // this.getAllcategoryproduct();
  }

 startAutoSlide() {
  this.bannerInterval = setInterval(() => {
    if (this.productTopBanners.length > 0) {
      this.currentProductBannerIndex = (this.currentProductBannerIndex + 1) % this.productTopBanners.length;
    }
  }, 3000); // Slide every 3 seconds
}



getBanners() {
  this.bannerService.getBanners().subscribe({
    next: (res) => {
      if (res.status === 0 && Array.isArray(res.response) && res.response.length > 0) {
        this.banners = res.response;
       this.productTopBanners = this.banners.filter(b =>
  b.bannerPage?.includes('product') && b.bannerType?.includes('top_banner')
);

       this.productBottomBanners = this.banners.filter(b =>
  b.bannerPage?.includes('product') && b.bannerType?.includes('bottom_banner')
);
      } else {
        this.banners = [];
        // this.matSnackBar.open("No banners found!", 'x', { duration: 2000 });
      }
    },
    error: (err) => {
      console.error('Banner fetch failed:', err);
      this.matSnackBar.open("Error fetching banners!", 'x', { duration: 2000 });
    }
  });
}




  
goBack(): void {
  this.location.back();
}

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.routeSubscription.unsubscribe();
     if (this.bannerInterval) {
    clearInterval(this.bannerInterval);
  }
  }
  toggleIcons(iconClicked: string) {
    if (iconClicked === 'first') {
      this.secondIconDisabled = true;
      this.firstIconDisabled = false;
    } else if (iconClicked === 'second') {
      this.firstIconDisabled = true;
      this.secondIconDisabled = false;
    }
  }
  getproductById() {
    if(this.userid == null){
      this.userid = 0;
    }
    this.dashboardservice.getProductByCategoryId(this.productid,this.userid).subscribe((res) => {
      if (res.status === 0) {
        this.productRes = res['response'];
        const convertedSlug = this.dashboardservice.generateSlug(this.productRes?.title);
        this.slug !== convertedSlug ? this.router.navigate(
          ['/product', this.productid, convertedSlug],
          { replaceUrl: true }) : '';
      }
    });

  }

  chnageQuantityVal(ev:any){
    this.productRes.quantity = ev.target.value;
  }

  submitcart(productId:any,price:any,qutantity:any){
    if(this.userid > 0 ) {
      if(qutantity > 0 ){
        let data = {
          productId:productId,
          userId: this.userid,
          quantity: qutantity,
          weight:0,
          shipping:0,
          price:price
       
        }
        this.dashboardservice.savewishcart(data).subscribe((res) => {
          if (res.status == 0) {
            this.matSnackBar.open(res.response, 'x', { duration: 2000 });
            this.reloadCommonService.sendUpdate('reloadWalletDetail');
            this.getproductById();
            this.cardload(0);
            this.getallcarttotal(0);
            this.getallcount();
            this.getallcart();
            window.location.reload();
          }
          else {
            this.matSnackBar.open("Error while updating", 'x', { duration: 2000 });
          }
        })
      }
      else{
        this.matSnackBar.open("Quantity  greater  than 0", 'x', { duration: 2000 });
      }
    } else{
      this.router.navigate(['/email-signup']);
    } 
 
  }
  submit(productId:any){
     
   if( this.userid > 0  ){
    let data = {
      productId:productId,
      userId: this.userid,
      wishlistId:0,
   
    }
    this.dashboardservice.savewishlist(data).subscribe((res) => {
      if (res.status == 0) {
        this.matSnackBar.open(res.response, 'x', { duration: 2000 });
        this.getproductById();
        this.reloadCommonService.sendUpdate('reloadWalletDetail');
      
      }
      else {
        this.matSnackBar.open(res.response, 'x', { duration: 4000 });
      }
    })
   }
   else{
    this.router.navigate(['/email-signup']);
  } 
  
  }
  getallcarttotal(page: number) {
   
    this.userid=localStorage.getItem('id');
    if(this.userid == null){
      this.userid = 0;
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
  cardload(page: number) {
    this.userid=localStorage.getItem('id');
    if(this.userid == null){
      this.userid = 0;
    }
    this.dashboardservice.getallcart(this.currentPage, this.pageSize,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        
        this.totalrecordLength = this.data.response.totalElements;
        this.wishlist = this.data.response.dataSet;
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
  incrementValue1(data: any): void {
    if (data.quantity === undefined) {
      // If quantity property doesn't exist, initialize it with 1
      data.quantity = 1;
    } else {
      // Increment the quantity
      data.quantity += 1;
    }
  }
  
  decrementValue1(data: any): void {
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
        this.matSnackBar.open("Quantity Update ", 'x', { duration: 2000 });
        this.reloadCommonService.sendUpdate('reloadWalletDetail');
        this.getallcarttotal(0);
        this.cardload(0);
        this.getallcount();
        this.getallcart();
      }
      else {
        this.matSnackBar.open(res.response, 'x', { duration: 2000 });
      }
    })
  
  }
  getallcart() {
    this.userid=localStorage.getItem('id');
    if(this.userid == null){
      this.userid = 0;
    }
    this.dashboardservice.getcartcount(this.userid).subscribe(res => {
        this.data = res;
        if (this.data.status === 0) {  
            this.fwishcart = this.data.response;
            
        } else {
            // Handle other cases if needed
        }
    });
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
getPrice():any{
  return parseFloat(this.productRes?.price) * parseInt(this.productRes?.quantity?this.productRes?.quantity:1);
}
}
