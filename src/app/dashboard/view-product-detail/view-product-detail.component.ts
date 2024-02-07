import { Component, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  currentValue: number = 22;
  firstIconDisabled: boolean = true;
  secondIconDisabled: boolean = false;
  productRes:any;
  wishlist:any;
  userid:any;
  totalrecordLength:any;
  carttotal:any;
  currentPage=0;
  pageSize=30;
  data:any;

  productid:any;
  constructor(private dashboardservice:DashboardService,private route: ActivatedRoute ,private matSnackBar:MatSnackBar ){

  }
  ngOnInit(): void {
    
    this.productid = this.route.snapshot.params['id'];
    this.userid=localStorage.getItem('id');
   this.getproductById();
   this.getallcarttotal(0);
   this.cardload(0)
    // this.getAllcategoryproduct();
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
    this.dashboardservice.getProductByCategoryId(this.productid).subscribe((res) => {
      if (res.status === 0) {
        this.productRes = res['response'];
      
      }
    });

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
