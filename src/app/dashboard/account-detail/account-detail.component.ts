import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/shared/signin-popup/signin-popup.component';
import { AddNewUserPopupComponent } from '../add-new-user-popup/add-new-user-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MasterService } from 'src/app/services/master-service/master.service';
import { InventoryPopupComponent } from './inventory-popup/inventory-popup.component';
import { ChangeProductPopupComponent } from '../change-product-popup/change-product-popup.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('ProductModal', { static: false }) ProductModal?: ModalDirective;
  formGroup!:FormGroup;
  quantity1:any;
  myorderdata:any;
  showChangeProduct:boolean[]= [];
  selectedButton: string = ''; 
  dropdowndata:any;
  dropdowndata1:any;
  dropdowndata2:any;
  dropdowndata3:any;
  dropdowndata4:any;
  dropdowndata5:any;
  dropdowndata6:any;
  dropdowndata7:any;
  dropdowndata8:any;
  dropdowndata9:any;
  dropdowndata10:any;
  dropdowndata11:any;
  dropdowndata12:any;
  searchproductform!:FormGroup;
  mydata:any;
  type=''
  searchText: string = '';
selectcategoryid: string = '';
productname=''
code=''
bin=''
vender=''
qutanity=''
price=''
total=''
ref=''
status=''
orderStatus:any
customername=''
transationdate=''
routee=''
data1=''
driver=''
  customerdetail:any;
  totalrecordLength:any;
  totalrecordLengthh:any;
  orderserach!:FormGroup;
  orderform!:FormGroup
  userid:any;
  vendor:any;
  orderDetails:any
  reorder:any;
  addressdetail:any;
  isConfirmSelected:boolean=false;
  isPendingSelected:boolean=false;
  isexpandorder:boolean=false;
  quantity:any;
  bulkoderguide:any;
  productDetails:any;
  myorderOpen:boolean=false;
  bulkorderespons:any
  bulkorderguide:any;
  bulkoderguid:any;
  getallstafff:any;
  data:any;
  allorder:any;
  categoryy:any;
  isMissingSelected:boolean=true;
  categoryid=0;
  accountTypeRes:any;
  addOnUpdate:boolean=false;
  isProfileOpen: boolean = true;
  isPasswordOpen: boolean =false;
  isguideOpen:boolean=false;
  isorderOpen:boolean=false;
  addressOpen:boolean=false;
  isexpandorderr:boolean=false;
  isbulkOpen:boolean=false;
  staffOpen:boolean=false;
  showmyprfile: boolean = true;
  showmypassword: boolean = false;
  showorder:boolean=false;
  Bulkorder:boolean=false;
  myorderrOpenn:boolean=false;
  usertype:any;
  id:any;
  expandOpen:boolean=false;
  // selectedButton: string = ''; 
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
  submitted:any=false;

  firstTimeLogin: string | null = null;

 @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  cartItemsCount = 0;
  private dialogRef!: MatDialogRef<any>;

  constructor(private formBuilder:FormBuilder, private dialog:MatDialog,private snackBar:MatSnackBar,private dashboardservice:DashboardService,private route:Router,private reloadCommonService:MasterService, public authService: AuthService){
    this.firstTimeLogin =localStorage.getItem('firstTimeLogin');
    if (this.firstTimeLogin == 'true') {
      this.showpassword()
    }
  }
  ngOnInit() {
    this.getallbulkorder(0);
    this.getalldropdown('PRODUCTNAME')
    this.getalldropdown('CODE')
    this.getalldropdown('BIN')
    this.userId=localStorage.getItem('id');
    // this.usertype=localStorage.getItem('usertype')
    this.authService.userType$.subscribe(userType=>{
      this.usertype = userType;
    })
    console.log(this.userid,'userid')
    if( this.usertype ==1){
      this.expandOpen=true;
      this.getallexpandorder('')
    }
    if(this.userId != 0 ){
      this.userid =this.userId;
      this.getaccountdetailById();
    }else{
      this.userid=0
    }
    this.formGroup = this.formBuilder.group({
      firstName: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      businessName:[''],
      mobile:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
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
      this.changepasswordform = this.formBuilder.group({
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        oldPassword:['',Validators.required]
      }, { validator: this.passwordMatchValidator });
      this.orderserach=this.formBuilder.group({
        categoryId:[''],
      })
      this.searchproductform=this.formBuilder.group({
        productname:['']
      })
   
}

keyPressAlphabetsWithSpace(event: any) {
  var charCode = (event.which) ? event.which : event.keyCode;
  if ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || charCode === 32 ) {
    return true;
  }
  else {
    return false;
  }
}

keyPressAlphabets(event: any) {
  var charCode = (event.which) ? event.which : event.keyCode;
  if ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90)) {
    return true;
  }
  else {
    return false;
  }
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
showexpandorder(){
 this.isexpandorder=true ;
 this.isexpandorderr=false;
}
showexpandorderr(){
  this.isexpandorder=false ;
  this.isexpandorderr=true;
}
selectButton(button: string) {
  this.selectedButton = button;
  this.getallexpandorder(button); 
}
passwordMatchValidator(changepasswordform: FormGroup) {
  const newPassword = changepasswordform.get('newPassword')?.value;
  const confirmPassword = changepasswordform.get('confirmPassword')?.value;

  if (newPassword !== confirmPassword) {
    changepasswordform.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  } else {
    changepasswordform.get('confirmPassword')?.setErrors(null);
  }
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
  this.expandOpen=false;
  this.myorderOpen=false;
  this.myorderrOpenn=false;


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
  this.expandOpen=false;
  this.myorderOpen=false;
  this.myorderrOpenn=false;

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
  this.expandOpen=false;
  this.myorderOpen=false;
  this.myorderrOpenn=false;

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
  this.expandOpen=false;
  this.myorderOpen=false;
  this.myorderrOpenn=false;

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
  this.expandOpen=false;
  this.myorderOpen=false;
  this.myorderrOpenn=false;

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
  this.expandOpen=false;
  this.myorderOpen=false;
  this.myorderrOpenn=false;

}
expandorder(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.staffOpen=false;
  this.isguideOpen=false;
  this.addressOpen=false;
  this.isbulkOpen=false;
  this.isorderOpen=false;
  this.expandOpen=true;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;
  this.isProfileOpen=false
  this.isPasswordOpen=false;
  this.expandOpen=true;
  this.myorderOpen=false;
  this.myorderrOpenn=false;

}
myorderopen(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.staffOpen=false;
  this.isguideOpen=false;
  this.addressOpen=false;
  this.isbulkOpen=false;
  this.isorderOpen=false;
  this.expandOpen=false;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;
  this.isProfileOpen=false
  this.isPasswordOpen=false;
  this.expandOpen=false;
  this.myorderOpen=true;
  this.myorderrOpenn=false;

}
myexpandorder(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.staffOpen=false;
  this.isguideOpen=false;
  this.addressOpen=false;
  this.isbulkOpen=false;
  this.isorderOpen=false;
  this.expandOpen=false;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;
  this.isProfileOpen=false
  this.isPasswordOpen=false;
  this.expandOpen=false;
  this.myorderOpen=false;
  this.myorderrOpenn=true;
}
openeclinicAcessDialog(id:any): void {
  this.dialog.open(SigninPopupComponent, {
    width: '914px',
    height:'400px',
    panelClass: 'py-2',
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
  this.submitted=true;
  if(this.formGroup.valid ){
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
  

}


changepassword(){ 
  if(this.changepasswordform.valid){
    let data = {
      newPassword:this.changepasswordform.value.newPassword,
      oldPassword:this.changepasswordform.value.oldPassword,
    }
    this.dashboardservice.changepassword(data).subscribe((res) => {
      if (res.status == 0) {
        this.snackBar.open(res.response ,'x', { duration: 2000 });
        if (this.firstTimeLogin == 'true') {
          localStorage.removeItem('firstTimeLogin');
          this.route.navigateByUrl('');
        }
      }
      else {
        this.snackBar.open("Error while updating", 'x', { duration: 2000 });
      }
    })
  }else{
    this.snackBar.open('Please enter all details.','x', { duration: 2000 });
  }

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
        billingAddressLine1:this.accountTypeRes.billingAddressine1,
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
  if(this.userid == null){
    this.userid = 0
  }
  this.dashboardservice.getallbulkorder(categoryid,this.userid).subscribe((res:any)=>{
    if(res.status ==0){
    this.bulkorderguide=res.response
    console.log(this.bulkorderguide,'bulkorderguideeeeeee')
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
  if(this.userid == null){
    this.userid = 0
  }
  this.dashboardservice.getallorder(this.userid).subscribe((res:any)=>{
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
  this.getallexpandorder(this.selectedButton);
}
pageChangedd(event: any) {
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  // const calculatedPageIndex = this.currentPage * this.pageSize;
  this.getalladdress(event.pageIndex);
}
pageChangeddd(event: any) {
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  // const calculatedPageIndex = this.currentPage * this.pageSize;
  // this.getorderbyorderid();
}
getallstaff(page:number){
  this.userid=localStorage.getItem('id');
  if(this.userid == null){
    this.userid = 0
  }
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
  
  this.dashboardservice.getAllcategoryy().subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallmyorder() {
  const vender = this.selectcategoryid;
  const search = this.searchText;
  this.dashboardservice.getAllBrfoodUserOrder(this.currentPage, this.pageSize,search,vender).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.myorderdata = this.data.response.dataSet;
      this.totalrecordLengthh = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLengthh;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getorderbyorderid(orderid:any,orderitemid:any,) {
  const serach =''
  console.log('hksk')
  this.dashboardservice.getorderbyorderid(this.currentPage, this.pageSize,orderid,this.userId,serach,orderitemid).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.customerdetail=this.data.response.dataSet.customerDetails;
      this.addressdetail=this.data.response.dataSet.shippingDetails;
      this.productDetails=this.data.response.dataSet.productDetails;
      this.orderDetails=this.data.response.dataSet.orderDetails;
      this.totalrecordLengthh = this.data.response.totalElements;
      console.log(this.totalrecordLengthh,'this.totalrecordLengthh')
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLengthh;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getmyorderbyorderid(orderid:any) {
  this.ProductModal?.show()

  const serach ='';
  const orderitemid=''
  console.log('hksk')
  this.dashboardservice.getorderbyorderid(this.currentPage, this.pageSize,orderid,this.userId,serach,orderitemid).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.customerdetail=this.data.response.dataSet.customerDetails;
      this.addressdetail=this.data.response.dataSet.shippingDetails;
      this.productDetails=this.data.response.dataSet.productDetails;
      this.orderDetails=this.data.response.dataSet.orderDetails;
      this.totalrecordLengthh = this.data.response.totalElements;
      console.log(this.totalrecordLengthh,'this.totalrecordLengthh')
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLengthh;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getmyorderbyorderidandorderitemid(orderid:any,orderitemid:any) {
  const serach ='';
  console.log('hksk')
  this.dashboardservice.getorderbyorderid(this.currentPage, this.pageSize,orderid,this.userId,serach,orderitemid).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.customerdetail=this.data.response.dataSet.customerDetails;
      this.addressdetail=this.data.response.dataSet.shippingDetails;
      this.productDetails=this.data.response.dataSet.productDetails;
      this.orderDetails=this.data.response.dataSet.orderDetails;
      this.totalrecordLengthh = this.data.response.totalElements;
      console.log(this.totalrecordLengthh,'this.totalrecordLengthh')
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLengthh;
      });
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
    quantity:quantity || 1,
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

  getallreorder(orderid: any) {
    this.userid = localStorage.getItem('id');
    this.dashboardservice.getallcart(this.currentPage, this.pageSize, this.userid).subscribe(res => {
      this.cartItemsCount = res?.response?.totalElements || 0;
      if (this.cartItemsCount > 0) {
        this.dialogRef = this.dialog.open(this.confirmDialog, { width: '400px' });
        this.dialogRef.afterClosed().subscribe(result => {
          if (result === 'clear') {
            this.dashboardservice.clearAllCart(this.userId).subscribe({
              next: (res: any) => {
              this.snackBar.open('Cart cleared successfully.', 'X', { duration: 2000 });
              this.doReorder(orderid);
            },
            error: (err) => {
              console.error('Error clearing cart:', err);
              this.snackBar.open('Failed to clear cart. Please try again.', 'X', { duration: 3000 });
            }
            })
          } else if (result === 'add') {
            this.doReorder(orderid);
          }
        });
      } else {
        this.doReorder(orderid);
      }
    });
  }

  onDialogAction(action?: string) {
    this.dialogRef.close(action);
  }

  private doReorder(orderid: any) {
    this.dashboardservice.getallreorder(orderid, this.userid).subscribe((res: any) => {
      if (res.status === 0) {
        this.reorder = res.response;
        this.snackBar.open('Reorder successful', 'X', { duration: 2000 });
        this.reloadCommonService.sendUpdate('reloadWalletDetail');
        this.route.navigate(['/my-cart-list', orderid])
      }
    });
  }

saveorder(orderid:any){
  this.dashboardservice.saveorder(orderid).subscribe((res:any)=>{
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
 addToCart(productId: any, price: any, wishlistId: any,quantity:any) {
  let data = {
    productId: productId,
    userId: this.userid,
    quantity:quantity || 1,
    weight: 0,
    shipping: 0,
    price: price
  };

  this.dashboardservice.savewishcart(data).subscribe((res) => {
    if (res.status == 0) {
      this.snackBar.open("Added To Cart", 'x', { duration: 2000 });
      this.reloadCommonService.sendUpdate('reloadWalletDetail');
      this.getallbulkorder(0);
    } else {
      this.snackBar.open("Error while updating", 'x', { duration: 2000 });
    }
  });
}

sumbiCart() {
  let bulkAddArray = [];

  for (let categoryData of this.bulkorderguide) {
    for (let data1 of categoryData.bulkOrderResponses) {
      // Check for invalid quantity
      if (!data1.quantity || data1.quantity <= 0) {
        this.snackBar.open("Please update the quantity to at to the cart",'x', { duration: 3000 });
        return; // stop execution if any quantity is invalid
      }

      

      bulkAddArray.push({
        price: data1.price,
        quantity: data1.quantity,
        productId: data1.productId,
        isCart: data1.isCart
      });
    }
  }
  
  let data = {
    bulkAdd: bulkAddArray,
    userId: this.userid
  };
  
  this.dashboardservice.bulkcartadd(data).subscribe((res) => {
    if (res.status === 0) {
      this.snackBar.open("Added To Cart", 'x', { duration: 2000 });
      this.getallbulkorder(0);
      this.reloadCommonService.sendUpdate('reloadWalletDetail');
    } else {
      this.snackBar.open("Error while updating", 'x', { duration: 2000 });
    }
  });
}

openeAcessDialog(): void {
  // Open the dialog
  const dialogRef: MatDialogRef<SigninPopupComponent> = this.dialog.open(SigninPopupComponent, {
    width: '914px',
    height: '470px',
    
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
    height: '384px',
  });

  // Subscribe to the afterClosed event
  dialogRef.afterClosed().subscribe(result => {
    // This code will be executed when the dialog is closed
    // You can call your API or perform any other action here
    this.getallstaff(0);
  });
}
changeproductpopup(orderid:any,orderItemId:any,replaceProductId:any): void {
  const dialogRef: MatDialogRef<ChangeProductPopupComponent> = this.dialog.open(ChangeProductPopupComponent, {
    width: '600px',
    height: '320px',
    data:{
      orderid:orderid,
      orderitemid:orderItemId,
      replaceproductid:replaceProductId
    }
  });
  // Subscribe to the afterClosed event
  dialogRef.afterClosed().subscribe(result => {
    // This code will be executed when the dialog is closed
    // You can call your API or perform any other action here
    this.getmyorderbyorderid(orderid);
  });
}
openeinventorydialog(productName: any, totalPrice: any, productId: any, orderItemId: any, quantity: any, inventoryItems: any,orderId:any): void {

  const dialogRef: MatDialogRef<InventoryPopupComponent> = this.dialog.open(InventoryPopupComponent, {
    width: '914px',
    height: '384px',  
    data:{
      productName:productName,
      totalPrice:totalPrice,
      productId:productId,
      orderItemId:orderItemId,
      quantity:quantity,
      inventoryItems:inventoryItems,
      orderId:orderId

    }
    
  });
  dialogRef.afterClosed().subscribe(result => {
    // This code will be executed when the dialog is closed
    // You can call your API or perform any other action here
    this.getmyorderbyorderidandorderitemid(orderId,orderItemId);

  });

  // Subscribe to the afterClosed event
  // openeinventorydialog
}
downoladinvoice(orderid:any){
  this.dashboardservice.downloadprintinvoice(orderid).subscribe( res =>{
    this.data =res.response;
    window.open(this.data, '_blank');
  })
}
getallexpandorder(selectedButton: string) {
  const serach =this.searchText;
  const productname = ''
  const code= ''
  const bin=  ''
  const vender=''
  const qutanity= ''
  const price=''
  const total = ''
  const customername= ''
  const ref= ''
  const status= ''
  const transationdate= ''
  const driver=''
  const routee=''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,selectedButton,productname,code,bin,vender,qutanity,price,total,customername,ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
      this.productname = '';
      this.code='';
      this.bin='';
      this.vender='';
      this.qutanity='';
      this.price='';
      this.total='';
      this.customername='';
      this.ref='';
      this.status='';
      this.transationdate='';
      this.driver='';
      this.routee=''
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandorderr(productName:any) {
  const serach =this.searchText;
  const productname =productName ||''
  const code=this.code || ''
  const bin= this.bin || ''
  const vender=this.vender ||''
  const qutanity=this.qutanity || ''
  const price=this.price || ''
  const total =this.total || ''
  const customername=this.customername || ''
  const ref=this.ref || ''
  const status=this.status || ''
  const transationdate=this.transationdate || ''
  const driver=this.driver ||''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,code,bin,vender,qutanity,price,total,customername,ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandordercode(code:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=code || ''
  const bin= this.bin || ''
  const vender=this.vender ||''
  const qutanity=this.qutanity || ''
  const price=this.price || ''
  const total =this.total || ''
  const customername=this.customername || ''
  const ref=this.ref || ''
  const status=this.status || ''
  const driver=this.driver ||''
  const transationdate=this.transationdate || ''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,bin,vender,qutanity,price,total,customername,ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandorderbin(bin:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= bin || ''
  const vender=this.vender ||''
  const qutanity=this.qutanity || ''
  const price=this.price || ''
  const total =this.total || ''
  const customername=this.customername || ''
  const ref=this.ref || ''
  const status=this.status || ''
  const driver=this.driver ||''
  const transationdate=this.transationdate || ''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,vender,qutanity,price,total,customername,ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandordervender(vender:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=vender ||''
  const qutanity=this.qutanity || ''
  const price=this.price || ''
  const total =this.total || ''
  const customername=this.customername || ''
  const ref=this.ref || ''
  const status=this.status || ''
  const driver=this.driver ||''
  const transationdate=this.transationdate || ''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,qutanity,price,total,customername,ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandorderqutanity(qutanity:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=this.vender ||''
  const Qutanity=qutanity || ''
  const price=this.price || ''
  const total =this.total || ''
  const customername=this.customername || ''
  const ref=this.ref || ''
  const status=this.status || ''
  const driver=this.driver ||''
  const transationdate=this.transationdate || ''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,Qutanity,price,total,customername,ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandorderprice(price:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=this.vender ||''
  const Qutanity=this.qutanity || ''
  const Price=price || ''
  const total =this.total || ''
  const customername=this.customername || ''
  const ref=this.ref || ''
  const status=this.status || ''
  const driver=this.driver ||''
  const transationdate=this.transationdate || ''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,Qutanity,Price,total,customername,ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandordertotal(total:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=this.vender ||''
  const Qutanity=this.qutanity || ''
  const Price=this.price || ''
  const Total =total || ''
  const customername=this.customername || ''
  const ref=this.ref || ''
  const status=this.status || ''
  const transationdate=this.transationdate || ''
  const driver=this.driver ||''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,Qutanity,Price,Total,customername,ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandordercustomer(customername:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=this.vender ||''
  const Qutanity=this.qutanity || ''
  const Price=this.price || ''
  const Total =this.total || ''
  const Customername=customername || ''
  const ref=this.ref || ''
  const status=this.status || ''
  const transationdate=this.transationdate || ''
  const driver=this.driver ||''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,Qutanity,Price,Total,Customername,ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandorderref(ref:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=this.vender ||''
  const Qutanity=this.qutanity || ''
  const Price=this.price || ''
  const Total =this.total || ''
  const Customername=this.customername || ''
  const Ref=ref || ''
  const status=this.status || ''
  const driver=this.driver ||''
  const transationdate=this.transationdate || ''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,Qutanity,Price,Total,Customername,Ref,status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandorderstatus(orderStatus:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=this.vender ||''
  const Qutanity=this.qutanity || ''
  const Price=this.price || ''
  const Total =this.total || ''
  const Customername=this.customername || ''
  const Ref=this.ref || ''
  const Status=orderStatus || ''
  const driver=this.driver ||''
  const transationdate=this.transationdate || ''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,Qutanity,Price,Total,Customername,Ref,Status,driver,transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandordertransationdate(transationdate:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=this.vender ||''
  const Qutanity=this.qutanity || ''
  const Price=this.price || ''
  const Total =this.total || ''
  const Customername=this.customername || ''
  const Ref=this.ref || ''
  const Status=this.status || ''
  const Transationdate=transationdate || ''
  const driver=this.driver ||''
  const routee=this.routee || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,Qutanity,Price,Total,Customername,Ref,Status,driver,Transationdate,routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandorderdriver(data1:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=this.vender ||''
  const Qutanity=this.qutanity || ''
  const Price=this.price || ''
  const Total =this.total || ''
  const Customername=this.customername || ''
  const Ref=this.ref || ''
  const Status=this.status || ''
  const driver=this.driver ||''
  const Transationdate=this.transationdate || ''
  const Routee=data1 || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,Qutanity,Price,Total,Customername,Ref,Status,driver,Transationdate,Routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getallexpandorderroute(data1:any) {
  const serach =this.searchText;
  const productname =this.productname ||''
  const Code=this.code || ''
  const Bin= this.bin || ''
  const Vender=this.vender ||''
  const Qutanity=this.qutanity || ''
  const Price=this.price || ''
  const Total =this.total || ''
  const Customername=this.customername || ''
  const Ref=this.ref || ''
  const Status=this.status || ''
  const driver=this.driver || ''
  const Transationdate=this.transationdate || ''
  const Routee=data1 || ''
  this.dashboardservice.getBrFoodUserOrderProduct(this.currentPage, this.pageSize,serach,this.type,productname,Code,Bin,Vender,Qutanity,Price,Total,Customername,Ref,Status,driver,Transationdate,Routee).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.category = this.data.response.dataSet;
      this.totalrecordLength = res.response.totalElements;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = this.totalrecordLength;
      });
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}

getallvendor() {
 const userId=this.userid
  this.dashboardservice.getallvendor(userId).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.vendor = this.data.response;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}

changestaus(orderItemId: any) {
  this.dashboardservice.changecheckedstatus(orderItemId).subscribe(
    (res: any) => { // Assuming res is of type any for now
      if (res && res.status === 0) { // Check if res exists and has a status property
        this.snackBar.open("Changed successfully", 'x', { duration: 2000 });
      }
    },
    (error) => {
      console.error('Error occurred:', error);
      // Handle error appropriately, show error message or take other actions
    }
  );
}
changestausofproduct(confirmStatus:any,remark:any,orderItemId:any,orderId:any){
  this.isPendingSelected = true;
  this.isConfirmSelected = false;
  this.isMissingSelected = false;
  this.showChangeProduct[orderItemId] = false;
  this.dashboardservice.changestatusofproduct(confirmStatus,remark,orderItemId).subscribe(
    (res: any) => { // Assuming res is of type any for now
      if (res && res.status === 0) { // Check if res exists and has a status property
        this.snackBar.open("Changed successfully", 'x', { duration: 2000 });
        this.getmyorderbyorderidandorderitemid(orderId,orderItemId)
      }
    },
    (error) => {
      console.error('Error occurred:', error);
      // Handle error appropriately, show error message or take other actions
    }
  );
}
changestausofproductt(confirmStatus:any,remark:any,orderItemId:any,orderId:any){
  this.isPendingSelected = false;
  this.isConfirmSelected = true;
  this.isMissingSelected = false;
  this.showChangeProduct[orderItemId] = false;
  this.dashboardservice.changestatusofproduct(confirmStatus,remark,orderItemId).subscribe(
    (res: any) => { // Assuming res is of type any for now
      if (res && res.status === 0) { // Check if res exists and has a status property
        this.snackBar.open("Changed successfully", 'x', { duration: 2000 });
        this.getmyorderbyorderidandorderitemid(orderId,orderItemId);
      }
    },
    (error) => {
      console.error('Error occurred:', error);
      // Handle error appropriately, show error message or take other actions
    }
  );
}
getalldropdown(type:any) {
   this.dashboardservice.getalldropdowndata(type).subscribe(res => {
     this.data =res;
     if (this.data.status === 0) {
       this.dropdowndata = this.data.response.dataSet;
     }
     else {
       this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
     }
   })
 }
 getalldropdown1(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata1 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown2(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata2 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown3(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata3 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown4(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata4 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown5(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata5 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown6(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata6 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown7(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata7 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown8(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata8 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown9(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata9 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown10(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata10 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown11(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata11 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
getalldropdown12(type:any) {
  this.dashboardservice.getalldropdowndata(type).subscribe(res => {
    this.data =res;
    if (this.data.status === 0) {
      this.dropdowndata12 = this.data.response.dataSet;
    }
    else {
      this.snackBar.open("Something went wrong!", 'x', { duration: 2000 })
    }
  })
}
updateremark(remark:any,orderItemId:any){

  this.dashboardservice.Updateremark(remark,orderItemId).subscribe((res) => {
  });
}
showChangeProductButton(remark:any,orderItemId:any,orderId:any,productId:any,confirmStatus:any) {
  this.isPendingSelected = false;
  this.isConfirmSelected = false;
  this.isMissingSelected = true;
  this.showChangeProduct[orderItemId] = true;
  // this.confirmStatus[orderItemId]='missing';
  // var elementPos = array.map(function(x) {return x.id; }).indexOf(idYourAreLookingFor);
  // var objectFound = array[elementPos];
  // let elementPos = this.productdetail.map((x: { orderItemId: any; }) => {return x.orderItemId; }).indexOf(orderItemId);
  // this.productdetail[elementPos].confirmStatus = 'Missing';
  this.dashboardservice.changestatusofproduct(confirmStatus,remark,orderItemId).subscribe((res)=>{
    this.getmyorderbyorderidandorderitemid(orderId,orderItemId)
    if(res['status']==0){
      // this.getmyorderbyorderid(orderId);
      // this.gettorderDetailsById();
      // this.changrproductlist = res.response;

    }


  });

}
keyPressNumbers(event:any) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}

  keyPressPincodes(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode >= 48 && charCode <= 57) ||
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode === 32 ||
      charCode === 45
    ) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

cancelorder(orderid:any){
  this.dashboardservice.Cancelorder(orderid).subscribe((res) => {
    this.getallmyorder()
  });
}
}