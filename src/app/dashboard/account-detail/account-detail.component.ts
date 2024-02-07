import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/shared/signin-popup/signin-popup.component';
import { AddNewUserPopupComponent } from '../add-new-user-popup/add-new-user-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent {
  formGroup!:FormGroup;
  orderserach!:FormGroup;
  userid:any;
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
  pageSize = 100;
  address:any;
  changepasswordform!:FormGroup;
  Orderguide:boolean=false;
  Mystaff:boolean=false;
  Myaddress:boolean=false;
  constructor(private formBuilder:FormBuilder, private dialog:MatDialog,private snackBar:MatSnackBar,private dashboardservice:DashboardService,private route:Router){

  }
  ngOnInit() {
    this.getallbulkorder();
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
openeclinicAcessDialog(): void {
  this.dialog.open(SigninPopupComponent, {
    width: '914px',
    height:'584px'
   
  });
}
openewuserdialog(): void {
  this.dialog.open(AddNewUserPopupComponent, {
    width: '914px',
    height:'584px'
   
  });
}
submit(){
     
  if (this.addOnUpdate) {
    let data = {
      userId:this.accountTypeRes.userId,
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      mobile: this.formGroup.value.mobile,
      businessName: this.formGroup.value.businessName,
      email: this.formGroup.value.email,
      billingAddressLine1: this.formGroup.value.billingAddressLine1,
      billingAddressLine2: this.formGroup.value.billingAddressLine2,
      city: this.formGroup.value.city,
      country: this.formGroup.value.country,
      state: this.formGroup.value.state,
      pincode: this.formGroup.value.pincode,
      addressLine2:this.formGroup.value.addressLine2,
      addressLine1:this.formGroup.value.addressLine1,
      billingPincode:this.formGroup.value.billingPincode,
      billingCity:this.formGroup.value.billingCity,
      billingCountry:this.formGroup.value.billingCountry,
      billingState:this.formGroup.value.billingState

    }
    this.dashboardservice.saveprofile(data).subscribe((res) => {
      if (res.status == 0) {
        this.snackBar.open("Updated Successfully", 'x', { duration: 2000 });
        this.route.navigate(['/system-settings/master-data'])
      }
      else {
        this.snackBar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
  }
  else {
    let data = {
      userId: 0,
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      mobile: this.formGroup.value.mobile,
      businessName: this.formGroup.value.businessName,
      email: this.formGroup.value.email,
      billingAddressLine1: this.formGroup.value.billingAddressLine1,
      billingAddressLine2: this.formGroup.value.billingAddressLine2,
      city: this.formGroup.value.city,
      country: this.formGroup.value.country,
      state: this.formGroup.value.state,
      pincode: this.formGroup.value.pincode,
      addressLine2:this.formGroup.value.addressLine2,
      addressLine1:this.formGroup.value.addressLine1,
      billingPincode:this.formGroup.value.billingPincode,
      billingCity:this.formGroup.value.billingCity,
      billingCountry:this.formGroup.value.billingCountry,
      billingState:this.formGroup.value.billingState

    }
    this.dashboardservice.saveprofile(data).subscribe((res) => {
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
  this.dashboardservice.getUserByUserId(this.id).subscribe((res)=>{
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
        billingAddressLine1:this.accountTypeRes.billingAddressLine1,
        billingAddressLine2:this.accountTypeRes.billingAddressLine2,
        city:this.accountTypeRes.city,
        country:this.accountTypeRes.country,
        state:this.accountTypeRes.state,
        pincode:this.accountTypeRes.pincode,
        addressLine2:this.accountTypeRes.addressLine2,
        addressLine1:this.accountTypeRes.addressLine1,
        billingPincode:this.accountTypeRes.billingPincode,
        billingCity:this.accountTypeRes.billingCity,
        billingCountry:this.accountTypeRes.billingCountry,
        billingState:this.accountTypeRes.billingState,


      })
    }
  })
}
getalladdress(){
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getalladdress(this.currentPage, this.pageSize,this.userid).subscribe((res:any)=>{
   if(res.status==0){
    this.address=res.response.dataSet
   }
  })
}
getallbulkorder(){
  const categoryid =this.selectcategoryid ||''
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getallbulkorder(categoryid,this.userid).subscribe((res:any)=>{
    if(res.status ==0){
    this.bulkorderguide=res.response
    console.log(this.bulkorderespons,'bulkorderesponse')
    }
  }
  )
}
getallorder(){
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getallorder(this.currentPage,this.pageSize,this.userid).subscribe((res:any)=>{
    if(res.status ==0){
    this.allorder=res.response.dataSet
   
    }
  }
  )
}
getallstaff(){
  this.userid=localStorage.getItem('id');
  this.dashboardservice.getallstaff(this.currentPage,this.pageSize,this.userid).subscribe((res:any)=>{
    if(res.status==0){
      this.getallstafff=res.response.dataSet
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
        this.getallbulkorder();
      }
    })
  }
}
deleteshippingaddress(id:any) {
  if (confirm("Are you sure wants to delete this Address?") == true) {
    this.dashboardservice.deleteshippingaddress(id).subscribe(res => {
      if (res.status == 0) {
        this.getalladdress();
      }
    })
  }
}
deletestaff(id:any) {
  if (confirm("Are you sure wants to delete this Staff?") == true) {
    this.dashboardservice.deletestaff(id).subscribe(res => {
      if (res.status == 0) {
        this.getallstaff();
      }
    })
  }
}
}
