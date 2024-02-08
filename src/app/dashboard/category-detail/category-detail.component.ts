import { Component, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  currentValue: number = 22;
  firstIconDisabled: boolean = true;
  secondIconDisabled: boolean = false;
  showMoreTextMap: { [key: string]: boolean } = {};
  categoryid:any;
  carttotal:any;
  wishlist:any;
  showMoreText:any;
  toggleStates: boolean[] = [];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  category:any;

  categoryname:any;
  data:any;
  userid:any;
  page: number = 0;
  size: number = 30;
  currentPage = 0;
  pageSize = 100;
  totalrecordLength:any;
  constructor(private dashboardservice:DashboardService,private router: Router,
    private route: ActivatedRoute,private matSnackBar:MatSnackBar) { }
   ngOnInit(): void {
     this.categoryid = this.route.snapshot.params['id'];
     this.userid=localStorage.getItem('id');
    this.tabelLoad(0);
    this.getallcarttotal(0);
    this.cardload(0)

    
     // this.getAllcategoryproduct();
   }

  toggleIcons(iconClicked: string, index: number) {
    if (iconClicked === 'first') {
      this.toggleStates[index] = false;
    } else if (iconClicked === 'second') {
      this.toggleStates[index] = true;
    }
  }
  tabelLoad(page: number) {
    this.dashboardservice.getAllProductByCategoryId(this.currentPage, this.pageSize,this.categoryid,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        window.scrollTo(0, 0);

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
  toggleShowMore(cardId: string) {
    this.showMoreTextMap[cardId] = !this.showMoreTextMap[cardId];
  }

  shouldShowMore(cardId: string, text: string): boolean {
    return text.length > 50;
  }

  getDisplayedText(cardId: string, text: string): string {
    return this.shouldShowMore(cardId, text) && this.showMoreTextMap[cardId] ? text : text.slice(0, 50);
  }
  submit(productId:any){
     
    let data = {
      productId:productId,
      userId: this.userid,
      wishlistId:0,
   
    }
    this.dashboardservice.savewishlist(data).subscribe((res) => {
      if (res.status == 0) {
        this.matSnackBar.open(res.response, 'x', { duration: 2000 });
        this.tabelLoad(0);
      }
      else {
        this.matSnackBar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
  
  }
  submitcart(productId:any,price:any){
     
    let data = {
      productId:productId,
      userId: this.userid,
      quantity:0,
      weight:0,
      shipping:0,
      price:price
   
    }
    this.dashboardservice.savewishcart(data).subscribe((res) => {
      if (res.status == 0) {
        this.matSnackBar.open("Added To Cart", 'x', { duration: 2000 });
        this.cardload(0)
        this.getallcarttotal(0)
      }
      else {
        this.matSnackBar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
  
  }
  getallcarttotal(page: number) {
    this.userid=localStorage.getItem('id');
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
  cardload(page: number) {
    this.userid=localStorage.getItem('id');
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
      this.dashboardservice.deletewishlist(id).subscribe(res => {
        if (res.status == 0) {
          this.cardload(0);
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
}
