import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MasterService } from 'src/app/services/master-service/master.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  @Output() apiCallSuccess: EventEmitter<any> = new EventEmitter();
  currentValue: number = 22;
  showMoreStates: boolean[] = [];
  firstIconDisabled: boolean = true;
  secondIconDisabled: boolean = false;
  showMoreTextMap: { [key: string]: boolean } = {};
  categoryid:any;
  
  focusedCardIndex: number = -1;
  carttotal:any;
  fwishlist:any;
  wishlist:any;
  fwishcart:any
  showMoreText:any;
  toggleStates: boolean[] = [];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  category:any;
  routeSubscription!: Subscription;
  categoryname:any;
  data:any;
  userid:any;
  page: number = 0;
  size: number = 30;
  currentPage = 0;  
  
  showMore: boolean = false;
  maxCharacters:number =17;
  pageSize = 100;
  totalrecordLength:any;
  constructor(private dashboardservice:DashboardService,private router: Router,
    private route: ActivatedRoute,private matSnackBar:MatSnackBar,private reloadCommonService:MasterService) { }
   ngOnInit(): void {
     this.categoryid = this.route.snapshot.params['id'];
     this.userid=localStorage.getItem('id');
     this.routeSubscription = this.route.params.subscribe(params => {
      this.categoryid = params['id'];
      this.tabelLoad(0);
    });
    this.tabelLoad(0);
    this.getallcarttotal(0);
    this.cardload(0);
    this.getallcount();

    
     // this.getAllcategoryproduct();
   }
   ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.routeSubscription.unsubscribe();
  }
  toggleIcons(iconClicked: string, index: number) {
    if (iconClicked === 'first') {
      this.toggleStates[index] = false;
    } else if (iconClicked === 'second') {
      this.toggleStates[index] = true;
    }
  }
  tabelLoad(page: number) {
    if(this.userid == null){
      this.userid = 0;
    }
    this.dashboardservice.getAllProductByCategoryId(this.currentPage, this.pageSize,this.categoryid,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {


        this.totalrecordLength = this.data.response.totalElements;
        this.category = this.data.response.projectResponse.dataSet;
        this.categoryname=this.data.response.category;
        this.toggleStates = new Array(this.category.length).fill(true);
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
  // toggleShowMore(cardId: string) {
  //   this.showMoreTextMap[cardId] = !this.showMoreTextMap[cardId];
  // }

  shouldShowMore(cardId: string, text: string): boolean {
    return text.length > 50;
  }

  getDisplayedText(cardId: string, text: string): string {
    return this.shouldShowMore(cardId, text) && this.showMoreTextMap[cardId] ? text : text.slice(0, 50);
  }
  submit(productId:any){
     if( this.userid > 0){
      let data = {
        productId:productId,
        userId: this.userid,
        wishlistId:0,
     
      }
      this.dashboardservice.savewishlist(data).subscribe((res) => {
        if (res.status == 0) {
          this.matSnackBar.open(res.response, 'x', { duration: 2000 });
          this.tabelLoad(0);
          this.reloadCommonService.sendUpdate('reloadWalletDetail');
        }
        else {
          this.matSnackBar.open("Error while updating", 'x', { duration: 2000 });
        }
      })
     }
     else{
      this.router.navigate(['/dashboard/email-signup']);
     }
  }
  submitcart(productId:any,price:any){
     if( this.userid > 0  ){
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
          this.reloadCommonService.sendUpdate('reloadWalletDetail');
          this.matSnackBar.open("Added To Cart", 'x', { duration: 2000 });
          this.cardload(0)
          this.getallcarttotal(0);
          this.getallcount();
          this.getallcart();
          // this.apiCallSuccess.emit();
          
  
        }
        else {
          this.matSnackBar.open("Error while updating", 'x', { duration: 2000 });
        }
      })
     }
    else{
      this.router.navigate(['/dashboard/email-signup']);
    } 
  }
  getallcarttotal(page: number) {
    this.userid=localStorage.getItem('id');
    console.log(this.userid,'userid');
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
    console.log(this.userid,'userid');
    if(this.userid == null){
      this.userid = 0;
    }
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
          this.getallcarttotal(0)
          this.cardload(0);
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
        this.getallcarttotal(0);
        this.cardload(0);
      }
      else {
        this.matSnackBar.open(res.response, 'x', { duration: 2000 });
      }
    })
  
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
highlightText(text: string, maxLength: number, index: number): string {
  // Your existing code here
  
  // Check if "Show more" state is true for this card
  if (this.showMoreStates[index]) {
    return text; // If "Show more" is clicked, return full text
  } else {
    // Otherwise, truncate text
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + '...';
    }
  }
}
toggleShowMore(index: number) {
  this.showMoreStates[index] = !this.showMoreStates[index]; // Toggle "Show more" state
}
// Method to set the focused card index
focusCard(event: MouseEvent,index: number) {
  event.preventDefault();
  event.stopPropagation();
  this.focusedCardIndex = index;
}
}
       