import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/shared/signin-popup/signin-popup.component';
import { AddNewUserPopupComponent } from '../add-new-user-popup/add-new-user-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  formGroup!:FormGroup;
  quantity1:any;
  totalrecordLength:any;
  orderserach!:FormGroup;
  userid:any;
  reorder:any;
  quantity:any;
  bulkoderguide:any;
  bulkorderespons:any
  bulkorderguide:any;
  bulkoderguid:any;
  getallstafff:any;
  data:any;
  allorder:any;
  categoryy:any;
  selectcategoryid:any
  categoryid=0;
  accountTypeRes:any;
  addOnUpdate:boolean=false;
  isProfileOpen: boolean = true;
  isPasswordOpen: boolean =false;
  isguideOpen:boolean=false;
  isorderOpen:boolean=false;
  addressOpen:boolean=false;
  isbulkOpen:boolean=false;
  staffOpen:boolean=false;
  showmyprfile: boolean = true;
  showmypassword: boolean = false;
  showorder:boolean=false;
  Bulkorder:boolean=false;
  id:any;
  
  category:any;
  page: number = 0;
  size: number = 30;
  currentPage = 0;
  pageSize = 30;
  address:any;
  userId:any;
  changepasswordform!:FormGroup;
  Orderguide:boolean=false;
  Mystaff:boolean=false;
  Myaddress:boolean=false;
  constructor(private formBuilder:FormBuilder, private dialog:MatDialog,private snackBar:MatSnackBar,private dashboardservice:DashboardService,private route:Router){

  }
  ngOnInit() {
    this.getallbulkorder(0);
    this.userId=localStorage.getItem('id');
    console.log(this.userid,'userid')
    if(this.userId != 0 ){
      this.userid =this.userId;
      this.getaccountdetailById();
    }else{
      this.userid=0
    }
    this.formGroup = this.formBuilder.group({
      firstName: ['',],
      lastName: ['', ],
      businessName:[''],
      mobile:[''],
      email:[''],
      billingAddressLine1:[''],
      billingAddressLine2:[''],
      city:[''],
      country:[''],
      state:[''],
      pincode:[''],
      addressLine2:[''],
      addressLine1:[''],
      billingPincode:[''],
      billingCity:[''],
      billingCountry:[''],
      billingState:['']

      });
      this.changepasswordform=this.formBuilder.group({
        newPassword:[''],
        oldPassword:[''],

      });
      this.orderserach=this.formBuilder.group({
        categoryId:[''],
      
      })
   
}
showSignInForm() {
  this.showmyprfile = true;
  this.isProfileOpen = true;
  this.staffOpen=false;
  this.addressOpen=false;
  this.isguideOpen=false;
  this.isbulkOpen=false;
  this.isPasswordOpen=false;
  this.isorderOpen=false;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;

}

showpassword() {
  this.showmyprfile = false;
  this.staffOpen=false;
  this.addressOpen=false;
  this.isPasswordOpen=true;
  this.isguideOpen=false;
  this.isbulkOpen=false;
  this.isorderOpen=false;
  this.isProfileOpen = false;
  this.showmypassword = true;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;
}
myorder() {
  this.isProfileOpen = false;
  this.isPasswordOpen=false;
  this.showmyprfile = false;
  this.addressOpen=false;
  this.staffOpen=false;
  this.isguideOpen=false;
  this.isbulkOpen=false;
  this.isorderOpen=true;
  this.showmypassword = false;
  this.showorder=true;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;
}
bulkorder(){
  this.showmyprfile = false;
  this.isorderOpen=false;  
  this.addressOpen=false;
  this.isguideOpen=false;
  this.staffOpen=false;
  this.isProfileOpen=false
  this.isPasswordOpen=false;
  this.showmypassword = false;
  this.isbulkOpen=true;
  this.showorder=false;
  this.Bulkorder=true;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;
}
orderguide(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.staffOpen=false;
  this.addressOpen=false;
  this.isbulkOpen=false;
  this.isorderOpen=false;
  this.isguideOpen=true;
  this.isProfileOpen=false
  this.isPasswordOpen=false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=true;
  this.Mystaff=false;
  this.Myaddress=false;
}
mystaff(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.staffOpen=false;
  this.isguideOpen=false;
  this.addressOpen=false;
  this.isbulkOpen=false;
  this.isorderOpen=false;
  this.showorder=false;
  this.staffOpen=true;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=true;
  this.Myaddress=false;
  this.isProfileOpen=false
  this.isPasswordOpen=false;
}
myaddress(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.staffOpen=false;
  this.isguideOpen=false;
  this.addressOpen=false;
  this.isbulkOpen=false;
  this.isorderOpen=false;
  this.addressOpen=true;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=true;
  this.isProfileOpen=false
  this.isPasswordOpen=false;
}
openeclinicAcessDialog(id:any): void {
  this.dialog.open(SigninPopupComponent, {
    width: '914px',
    height:'584px',
    data: {
      id:id
    }
    
  });
  console.log(id,'id')
  
}
// openeAcessDialog(): void {
//   this.dialog.open(SigninPopupComponent, {
//     width: '914px',
//     height:'584px',
   
    
//   });
//   this.getalladdress(0)
  
  
// }

submit(){
     
  if (this.addOnUpdate) {
    let formData: FormData = new FormData();
    formData.append('userId',this.accountTypeRes.userId);
    formData.append('firstName',this.formGroup.value.firstName);
    formData.append('lastName',this.formGroup.value.lastName);
    formData.append('mobile',this.formGroup.value.mobile);
    formData.append('businessName',this.formGroup.value.businessName);
    formData.append('email',this.formGroup.value.email);
    formData.append('billingAddressLine1',this.formGroup.value.billingAddressLine1);
    formData.append('billingAddressLine2',this.formGroup.value.billingAddressLine2);
    formData.append('city',this.formGroup.value.city);
    formData.append('country',this.formGroup.value.country);
    formData.append('state',this.formGroup.value.state);
    formData.append('pincode',this.formGroup.value.pincode);
    formData.append('addressLine2',this.formGroup.value.addressLine2);
    formData.append('addressLine1',this.formGroup.value.addressLine1);
    formData.append('billingPincode',this.formGroup.value.billingPincode);
    formData.append('billingCity',this.formGroup.value.billingCity);
    formData.append('billingCountry',this.formGroup.value.billingCountry);
    formData.append('billingState',this.formGroup.value.billingState);
   
    this.dashboardservice.saveprofile(formData).subscribe((res) => {
      if (res.status == 0) {
        this.snackBar.open("Updated Successfully", 'x', { duration: 2000 });
        // this.route.navigate(['/system-settings/master-data'])
      }
      else {
        this.snackBar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
  }
  else {
    const formData: FormData = new FormData();

    formData.append('userId','0');
    formData.append('firstName',this.formGroup.value.firstName);
    formData.append('lastName',this.formGroup.value.lastName);
    formData.append('mobile',this.formGroup.value.mobile);
    formData.append('businessName',this.formGroup.value.businessName);
    formData.append('email',this.formGroup.value.email);
    formData.append('billingAddressLine1',this.formGroup.value.billingAddressLine1);
    formData.append('billingAddressLine2',this.formGroup.value.billingAddressLine2);
    formData.append('city',this.formGroup.value.city);
    formData.append('country',this.formGroup.value.country);
    formData.append('state',this.formGroup.value.state);
    formData.append('pincode',this.formGroup.value.pincode);
    formData.append('addressLine2',this.formGroup.value.addressLine2);
    formData.append('addressLine1',this.formGroup.value.addressLine1);
    formData.append('billingPincode',this.formGroup.value.billingPincode);
    formData.append('billingCity',this.formGroup.value.billingCity);
    formData.append('billingCountry',this.formGroup.value.billingCountry);
    formData.append('billingState',this.formGroup.value.billingState);

    this.dashboardservice.saveprofile(formData).subscribe((res) => {
      if (res.status == 0) {
        this.snackBar.open("Saved Successfully", 'x', { duration: 2000 });
        this.route.navigate(['/system-settings/master-data'])
      }
      else {
        this.snackBar.open("Error while saving", 'x', { duration: 2000 });
      }
    })
  }

}


changepassword(){ 
  let data = {
    newPassword:this.changepasswordform.value.newPassword,
    oldPassword:this.changepasswordform.value.oldPassword,
  }
  this.dashboardservice.changepassword(data).subscribe((res) => {
    if (res.status == 0) {
      this.snackBar.open(res.response );
    }
    else {
      this.snackBar.open("Error while updating", 'x', { duration: 2000 });
    }
  })

}
getaccountdetailById(){
  this.dashboardservice.getallsigupuserbyid(this.userid).subscribe((res:any)=>{
    if(res.status == 0){
      console.log(res,"Response");
      this.accountTypeRes = res.response
      this.addOnUpdate = true;
      this.formGroup.patchValue({
        firstName: this.accountTypeRes.firstName,
        lastName:this.accountTypeRes.lastName,
        mobile:this.accountTypeRes.mobile,
        businessName:this.accountTypeRes.businessName,
        email:this.accountTypeRes.email,
        billingAddressine1:this.accountTypeRes.billingAddressine1,
        billingAddressLine2:this.accountTypeRes.billingAddressLine2,
        city:this.accountTypeRes.city,
        country:this.accountTypeRes.country,
        state:this.accountTypeRes.state,
        pincode:this.accountTypeRes.pincode,
        addressLine2:this.accountTypeRes.addressLine2,
        addressLine1:this.accountTypeRes.location,
        billingPincode:this.accountTypeRes.billingPincode,
        billingCity:this.accountTypeRes.billingCity,
        billingCountry:this.accountTypeRes.billingCountry,
        billingState:this.accountTypeRes.billingState,


      })
    }
  })
}
getalladdress(page:number){
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getalladdress(this.currentPage, this.pageSize,this.userid).subscribe((res:any)=>{
   if(res.status==0){
    this.address=res.response.dataSet
    this.totalrecordLength =res.response.totalElements;
   console.log( this.totalrecordLength,'totalrecordlength')
    setTimeout(() => {
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = this.totalrecordLength;
    });
   }
  })
}
getallbulkorder(page:number){
  const categoryid =this.selectcategoryid ||''
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getallbulkorder(categoryid,this.userid).subscribe((res:any)=>{
    if(res.status ==0){
    this.bulkorderguide=res.response
    console.log(this.bulkorderespons,'bulkorderesponse')
    this.totalrecordLength = this.data.response.totalElements;
     
    setTimeout(() => {
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = this.totalrecordLength;
    });
    }
  }
  )
}
getallorder(page:number){
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getallorder(this.currentPage,this.pageSize,this.userid).subscribe((res:any)=>{
    if(res.status ==0){
      this.allorder=res.response.dataSet
      this.totalrecordLength = this.data.response.totalElements;
     
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
  }
  )
}
pageChanged(event: any) {
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  // const calculatedPageIndex = this.currentPage * this.pageSize;
  this.getallstaff(event.pageIndex);
}
pageChangedd(event: any) {
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  // const calculatedPageIndex = this.currentPage * this.pageSize;
  this.getalladdress(event.pageIndex);
}
getallstaff(page:number){
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getallstaff(this.currentPage,this.pageSize,this.userid).subscribe((res:any)=>{
    if(res.status==0){
      this.getallstafff=res.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
    
   
     
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
  })
}
getallcategory(page: number) {
  this.dashboardservice.getAllcategoryy(this.currentPage, this.pageSize).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
deletewishlist(id:any) {
  if (confirm("Are you sure wants to delete this Product?") == true) {
    this.dashboardservice.deletewishlist(id).subscribe(res => {
      if (res.status == 0) {
        this.getallbulkorder(0);
      }
    })
  }
}
deleteshippingaddress(id:any) {
  if (confirm("Are you sure wants to delete this Address?") == true) {
    this.dashboardservice.deleteshippingaddress(id).subscribe(res => {
      if (res.status == 0) {
        this.getalladdress(0);
      }
    })
  }
}
deletestaff(id:any) {
  if (confirm("Are you sure wants to delete this Staff?") == true) {
    this.dashboardservice.deletestaff(id).subscribe(res => {
      if (res.status == 0) {
        this.getallstaff(0);
      }
    })
  }
}
submitcart(productId:any,price:any,quantity:any){
     
  let data = {
    productId:productId,
    userId: this.userid,
    quantity:quantity || 0,
    weight:0,
    shipping:0,
    price:price
 
  }
  this.dashboardservice.savewishcart(data).subscribe((res) => {
    if (res.status == 0) {
      this.snackBar.open("Added To Cart", 'x', { duration: 2000 });
      this.getallbulkorder(0);
    }
    else {
      this.snackBar.open(res.response, 'x', { duration: 2000 });
    }
  })

}
getallreorder(orderid:any){
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getallreorder(orderid,this.userid).subscribe((res:any)=>{
    if(res.status ==0){
    this.reorder=res.response
    this.snackBar.open(res.response,'X', { duration: 2000 })
    }
  }
  )
}
// addToCart(productId: number,isCart:any,price:any,quantity:any) {
//   if(quantity > 0){
//     let data = {
//       bulkAdd: [
//         {
//           isCart: isCart, 
//           price: price, 
//           productId: productId,
//           quantity: quantity
//         }
//       ],
//       userId: this.userid
//     };
  
//     this.dashboardservice.bulkcartadd(data).subscribe((res) => {
//       if (res.status == 0) {
//         this.snackBar.open("Added To Cart", 'x', { duration: 2000 });
//         this.getallbulkorder();
//       } else {
//         this.snackBar.open("Error while updating", 'x', { duration: 2000 });
//       }
//     });
//   }else{
//     this.snackBar.open("Qutanity greater  than 0", 'x', { duration: 2000 });
//   }
//   }
  addToCart(productId:any,price:any){
     
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
        this.snackBar.open("Added To Cart", 'x', { duration: 2000 });
      
      }
      else {
        this.snackBar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
  
  }
sumbiCart() {
  let bulkAddArray = [];

  for (let categoryData of this.bulkorderguide) {
    for (let data1 of categoryData.bulkOrderResponses) {
      bulkAddArray.push({
        price: data1.price,
        quantity: data1.quantity,
        productId:data1.productId,
        isCart:data1.isCart
      
      });
    }
  }

  let data = {
    bulkAdd: bulkAddArray,
    userId: this.userid
  };

  this.dashboardservice.bulkcartadd(data).subscribe((res) => {
    if (res.status == 0) {
      this.snackBar.open("Added To Cart", 'x', { duration: 2000 });
      this.getallbulkorder(0);
    } else {
      this.snackBar.open("Error while updating", 'x', { duration: 2000 });
    }
  });
}
openeAcessDialog(): void {
  // Open the dialog
  const dialogRef: MatDialogRef<SigninPopupComponent> = this.dialog.open(SigninPopupComponent, {
    width: '914px',
    height: '584px',
  });

  // Subscribe to the afterClosed event
  dialogRef.afterClosed().subscribe(result => {
    // This code will be executed when the dialog is closed
    // You can call your API or perform any other action here
    this.getalladdress(0);
  });
}
openewuserdialog(): void {
  const dialogRef: MatDialogRef<AddNewUserPopupComponent> = this.dialog.open(AddNewUserPopupComponent, {
    width: '914px',
    height: '584px',
  });

  // Subscribe to the afterClosed event
  dialogRef.afterClosed().subscribe(result => {
    // This code will be executed when the dialog is closed
    // You can call your API or perform any other action here
    this.getallstaff(0);
  });
}
}
