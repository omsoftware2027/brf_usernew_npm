import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from '../dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent {
  currentValue: number = 22;
  showMoreStates: boolean[] = [];
  firstIconDisabled: boolean = true;
  secondIconDisabled: boolean = false;
  showMoreTextMap: { [key: string]: boolean } = {};
  categoryid:any;
  maxCharacters:number =17;
  carttotal:any;
  wishlist:any;
  fwishlist:any;
  showMoreText:any;
  toggleStates: boolean[] = [];
  productt: any;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  category:any;
  searchproduct:FormGroup
  categoryname:any;
  data:any;
  userid:any;
  fwishcart:any;
  productname:any
  page: number = 0;
  size: number = 30;
  currentPage = 0;
  pageSize = 100;
  totalrecordLength:any;
  constructor(private dashboardservice:DashboardService,private router: Router,
    private route: ActivatedRoute,private matSnackBar:MatSnackBar,private formBuilder :FormBuilder,private dashboardService: DashboardService ) {
      this.searchproduct = this.formBuilder.group({
        name: [''],
      });
     }
   ngOnInit(): void {
     this.categoryid = this.route.snapshot.params['id'];
     this.productname = this.route.snapshot.params['name'];
     this.userid=localStorage.getItem('id');
    this.tabelLoad(0);
    this.getallcount();
    // this.getallcarttotal(0);
     this.cardload(0)
    this.getallproduct() 
      this.dashboardService.productSearchResults$.subscribe((data) => {
    this.productt = data;
    console.log("Productt====",this.productt)
  });
    
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
   const categoryid=this.categoryid || '';
    this.dashboardservice.getAllProductByCategoryId(this.currentPage, this.pageSize,categoryid,this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        window.scrollTo(0, 0);

        this.totalrecordLength = this.data.response.totalElements;
        this.category = this.data.response.projectResponse.dataSet;
        this.categoryname=this.data.response.category;
        this.toggleStates = new Array(this.category.length).fill(true);
        this.getallcarttotal(0);
        this.cardload(0);
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
        this.matSnackBar.open("Added To Order guide", 'x', { duration: 2000 });
      }
      else {
        this.matSnackBar.open(res.response, 'x', { duration: 4000 });
      }
    })
  
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
        this.cardload(0)
        this.getallcarttotal(0);
        this.getallcount();
        this.getallcart();
        // this.apiCallSuccess.emit();
     
        window.location.reload();
      
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
  // deletewishlist(id:any) {
  //   if (confirm("Are you sure wants to delete this Product?") == true) {
  //     this.dashboardservice.deletewishlist(id).subscribe(res => {
  //       if (res.status == 0) {
  //         this.cardload(0);
  //         this.getallcount();
  //         this.getallcart();
  //       }
  //     })
  //   }
  // }
  getallproduct() {
    const name =   this.productname || '';
    this.userid=localStorage.getItem('id');
    console.log(this.userid,'userid')
    this.dashboardservice.getallproduct(this.currentPage, this.pageSize ,name, this.userid).subscribe(res => {
      this.data =res;
      if (this.data.status === 0) {
        this.productt = this.data.response.dataSet;
      
      }
      else {
       
      }
    })
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
}
