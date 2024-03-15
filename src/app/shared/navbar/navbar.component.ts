import { Component , ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject, interval } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SigninPopupComponent } from '../signin-popup/signin-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignInComponent } from 'src/app/dashboard/sign-in/sign-in.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MasterService } from 'src/app/services/master-service/master.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    titlesAndIdsArray2:any;
    inputText: string = '';
    carttotal:any;
    showInput: boolean = true;
    userId:any;
    carttotalt:any;
    wishcart:any;
    wishlist:any;
    logindetail:any
    dropdownopen:boolean =true;
    userid:any;
    showSignIn: boolean = true;
    showSignUp: boolean = false;
    addOnUpdate:boolean=false;
    totalrecordLength:any;
    submitted:boolean =false;
    loginFormGroup!: FormGroup;
    SignUpForm!:FormGroup;
    searchproduct!:FormGroup;
    retryError = false;
    loginData:any;
    product:any;
    id:any;
    cmsEnum ='HEADER'
    cmsRes4:any
    // submitted:boolean = false;
    name:any;
    data: any;
    messageReceived:any;
    category:any;
    docSpecializationClone:any;
    page: number = 0;
    size: number = 30;
   currentPage = 0;
    pageSize = 500;
    loginn:boolean=true;
    token: any;
    loginTime:any;
    sessionId:any;
    formGroup!:FormGroup
    forgotpasswordform!:FormGroup;
    tabs: { [key: string]: boolean } = {
        'pills-manage-doc': false,
        'pills-alfa-dev': false,
        'pills-stocklist': false
      };
     listMenuItems:any=[
        {
            path: '/manage-doctor/search', title: 'Manage Doctor', icon: 'ri-stethoscope-line icon-color-2', class: 'px-3 my-doc-hover', badge: '', badgeClass: '', isExternalLink: false, submenu: []
        },
        {
            path: '/manage-target-segment/add-segment', title: 'Target Segment', icon: 'bx bx-target-lock icon-color-2', class: 'px-3 target-hover', badge: '', badgeClass: '', isExternalLink: false, submenu: []
        },
        {
            path: '/manage-medical-rep/manage-representative', title: 'Manage MedRep', icon: 'bx bx-clinic icon-color-2', class: 'px-3 med-rep-hover ', badge: '', badgeClass: '', isExternalLink: false, submenu: []
        },
       
        {
            path: '/headquarter/manage-headquarter', title: 'Manage Headquarter', icon: 'ri-building-line icon-color-2', class: 'px-3 hed-q-hover', badge: '', badgeClass: '', isExternalLink: false, submenu: []
        },
     ];
     alphaDevMenuItem:any=[
        {
            path: '/alfa-dev/doctor-clinics', title: 'Doctor Clinic', icon: 'ri-stethoscope-line icon-color-2', class: 'px-3 doctor-hover', badge: '', badgeClass: '', isExternalLink: false, submenu: []
        }, 
        {
            path: '/alfa-dev/pharmacy', title: 'Pharmacies', icon: 'ri-stethoscope-line icon-color-2', class: 'px-3 pharma-hover', badge: '', badgeClass: '', isExternalLink: false, submenu: []
        }, 
        {
            path: '/alfa-dev/hospital', title: 'Hospital', icon: 'ri-stethoscope-line icon-color-2', class: 'px-3 hos-hover', badge: '', badgeClass: '', isExternalLink: false, submenu: []
        }, 
     ]
    currentDataTime:any=new Date();
    @ViewChild('filterModal') filterModal!: TemplateRef<any>;
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private router: Router,
        public sidebarservice: SidebarService,public dialog: MatDialog,private formBuilder: FormBuilder,private matsnackbar:MatSnackBar,private dashboardservice:DashboardService,private route: ActivatedRoute,private reloadCommonService:MasterService ) {
          this.searchproduct = this.formBuilder.group({
            name: [''],
            categoryId:['']
          });
            setInterval(() => {
                this.currentDataTime = new Date();
              }, 1);

              this.reloadCommonService.getUpdate().subscribe
              (message => {
              this.messageReceived = message;
                if(this.messageReceived.text == 'reloadNavbar'){
                  this.ngOnInit();
                } else if(this.messageReceived.text == 'reloadWalletDetail'){
                  this.getallcart();
                  this.getallcount();
                  this.getallcarttotal(0);

                }
      });      
         }  
    toggleTab(tabId: string): void {
            this.tabs[tabId] = !this.tabs[tabId];
    }
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {
        this.name = localStorage.getItem('name');
        this.userId=localStorage.getItem('id');
        this.token = localStorage.getItem('token');
        this.loginTime = localStorage.getItem('loginTime');
        this.sessionId = localStorage.getItem('sessionId');
        this.getfootergeneral();
        this.getTeams();
        this.tabelLoad(0);
        this.getallcount();
        this.getallproduct();
        this.getallcart() ;
        this.login();
        this.getallcarttotal(0);
        
        this.formGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
          });
          this.forgotpasswordform = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
       
          });
          this.SignUpForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            firstName: ['',Validators.required],
            lastName:['',Validators.required],
            mobile:['',Validators.required],
            

          });
        //   interval(0).subscribe(() => {
         
        //     this.getallcount();
        //     this.getallcart();

        // });
       

        // if (!this.token) {
        //     localStorage.removeItem('Id');
        //     localStorage.removeItem('token');
        //     localStorage.removeItem('name')
        //     localStorage.clear();
        //     this.loggedIn.next(false);
        //     this.router.navigate(['/login']);
        // }

        /* Search Bar */
        // $(document).ready(function () {
        //     $(".search-btn-mobile").on("click", function () {
        //         $(".search-bar").addClass("full-search-bar");
        //     });
        //     $(".search-arrow-back").on("click", function () {
        //         $(".search-bar").removeClass("full-search-bar");
        //     });
        // });
        const tabContents = document.querySelectorAll(".tab-pane");

        tabContents.forEach(tabContent => {
          tabContent.addEventListener("click", () => {
            tabContent.classList.toggle("show");
            //  tabContent.classList.toggle("tab-content");
          });
        });

    }

    getTeams() {
        // this.teamsService.getTeamById(this.id).subscribe(res => {
        //     if (res.status == 0) {
        //         this.data = res.response;
        //         localStorage.setItem('roleID', res.response.userRole)
        //     }
        // })
    }

    logout(e:any):any{
        localStorage.removeItem('Id');
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        // this.teamsService.updateCompanyLogoutTime(this.sessionId).subscribe((res)=>{
        //     if(res.status==0){
        //         localStorage.removeItem('sessionId');
        //     }
        // })
        // this.snackBar.open('Logout Successfully', '', {
        //     duration: 3000,
        //     panelClass: ['success-snackbar']
        // });
        // e.preventDefault();
        // this.loggedIn.next(false);
        // this.router.navigate(['/login']);
    }
    openeclinicAcessDialog(): void {
        this.dialog.open(SigninPopupComponent, {
          width: '500px',
         
        });
      }


      ondropdownclick(){
        console.log('dropdownopen')
      }
      showSignInForm(event: Event) {
        event.stopPropagation();
        this.showSignIn = true;
        this.showSignUp = false;
        this.loginn =true;
      }
    

      showSignUpForm(event: Event) {
        event.stopPropagation();
        this.showSignIn = false;
        this.showSignUp = true;
      }
      logoutaccount(): void {
        this.dialog.open(SignInComponent, {
          width: '400px',
         
        });
      }
      stopPropagation(event: Event): void {
        event.stopPropagation();
      }
      onSubmit() {
        this.submitted = true;
        if (this.formGroup.valid) {
          const loginpayload = {
            email: this.formGroup.value.email,
            password: this.formGroup.value.password,
          };
          this.dashboardservice.login(loginpayload).subscribe(
            data => {
              this.loginData = data;
              if (this.loginData.status === 0) {
                localStorage.setItem('id', this.loginData.response.id);
                localStorage.setItem('token', this.loginData.response.token);
                console.log(this.loginData.response.id, 'loginData');
                window.location.reload();
                this.matsnackbar.open("Login Successfully", 'x', { duration: 2000 });
                this.router.navigate(['/dashboard']);
                if (this.dropdownMenu.nativeElement.classList.contains('show')) {
                  this.dropdownMenu.nativeElement.classList.remove('show');
                }
                this.formGroup.reset();
              } else {
                // Display error message from loginData.response.error or any appropriate field
                const errorMessage = this.loginData.response.error || 'Unknown error occurred';
                this.matsnackbar.open(errorMessage, 'x', { duration: 2000 });
              }
            },
            error => {
              // Handle HTTP errors
              this.matsnackbar.open("An error occurred while logging in", 'x', { duration: 2000 });
            }
          );
        }
      }

      submit(){
      this.submitted=true;
      console.log('hk')
       if(this.SignUpForm.valid){
        console.log('hk')
        let data = {
          email: this.SignUpForm.value.email,
          firstName: this.SignUpForm.value.firstName,
          lastName: this.SignUpForm.value.lastName,
          mobile:this.SignUpForm.value.mobile,
        
        }
        this.dashboardservice.signup(data).subscribe((res) => {
          if (res.status == 0) {
            this.matsnackbar.open("Sign Up  Successfully", 'x', { duration: 2000 });
            if (this.dropdownMenu.nativeElement.classList.contains('show')) {
              this.dropdownMenu.nativeElement.classList.remove('show');
            }
            this.SignUpForm.reset();
            // const dropdownToggle = document.querySelector('.dropdown-toggle');
            // if (dropdownToggle) {
            //   dropdownToggle.classList.remove('show');
            // }
          }
          else {
            this.matsnackbar.open(res.response, 'x', { duration: 2000 });
          }
        })
       }
      
      }
      tabelLoad(page: number) {
        this.dashboardservice.getAllcategoryy(this.currentPage, this.pageSize).subscribe(res => {
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
            this.matsnackbar.open("Something went wrong!", 'x', { duration: 2000 })
          }
        })
      }
      getfootergeneral() {
        this.dashboardservice.getallcmsdata(this.cmsEnum).subscribe((res) => {
          if (res.status === 0 && res['response'].length > 0) {
            this.titlesAndIdsArray2 = res['response'].map((item: { title: any; cmsId: any; }) => ({
              title: item.title,
              cmsId: item.cmsId
            }));
          }
        });
    
    }
     getallproduct() {
      const name = this.searchproduct.value.name || '';
      this.dashboardservice.getallproduct(this.currentPage, this.pageSize ,name).subscribe(res => {
        this.data =res;
        if (this.data.status === 0) {
          this.product = this.data.response.dataSet;
          this.docSpecializationClone=  this.product;
          // this.router.navigate(['/dashboard/all-product']);
        }
        else {
         
        }
      })
    }
    getallselectproduct() {
      const name = this.searchproduct.value.name || '';
      this.dashboardservice.getallproduct(this.currentPage, this.pageSize ,name).subscribe(res => {
        this.data =res;
        if (this.data.status === 0) {
          this.carttotal = this.data.response.dataSet;
          this.router.navigate(['/dashboard/view-product-detail',name]);
          
        }
        else {
         
        }
      })
    }
    getallselectcategory(categoryId: string) {
      this.userid=localStorage.getItem('id');
      this.dashboardservice.getAllProductByCategoryId(this.currentPage, this.pageSize, categoryId,this.userid).subscribe(res => {
          this.data = res;
          if (this.data.status === 0) {  
              this.carttotal = this.data.response.dataSet;
              this.router.navigate(['/dashboard/category-detail', categoryId]);
          } else {
              // Handle other cases if needed
          }
      });
  }
  getallcount() {
    this.userid=localStorage.getItem('id');
    if(this.userid == null){
      this.userid = 0
    }
    this.dashboardservice.getcountcart(this.userid).subscribe(res => {
        this.data = res;
        if (this.data.status === 0) {  
            this.wishlist = this.data.response;
            
        } else {
            // Handle other cases if needed
        }
    });
}

getallcart() {
  this.userid=localStorage.getItem('id');
  if(this.userid == null){
    this.userid = 0
  }
  this.dashboardservice.getcartcount(this.userid).subscribe(res => {
      this.data = res;
      if (this.data.status === 0) {  
          this.wishcart = this.data.response;
          
      } else {
          // Handle other cases if needed
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
      this.carttotalt = this.data.response.total;
    }
    // else {
    //   this.matSnackBar.open("Something went wrong!", 'x', { duration: 2000 })
    // }
  })
}
onProductSelected() {
   console.log('productId')
  const productId = this.searchproduct.value.name || '';
  if (productId) {
    this.router.navigate(['/dashboard/view-product-detail', productId]);
 
  }
}
// getallcarttotal(page: number) {
//   this.userid=localStorage.getItem('id');
//   console.log(this.userid,'userid');
//   if(this.userid == null){
//     this.userid = 0;
//   }
//   this.dashboardservice.getallcardtotal(this.currentPage, this.pageSize,this.userid).subscribe(res => {
//     this.data =res;
//     if (this.data.status === 0) {
//       this.carttotal = this.data.response;
//     }
//     else {
//       // this.matSnackBar.open("Something went wrong!", 'x', { duration: 2000 })
//     }
//   })
// }
keyPressNumbers(event:any) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}
specializationSelect(query: string): any[] {
  const result: any[] = [];
  // Check if this.docSpecializationClone is defined and not null
  if (this.docSpecializationClone) {
    console.log(this.docSpecializationClone,'this.docSpecializationClone')
    for (const b of this.docSpecializationClone) {
      // Check if b.name is defined and not null
      if (b.productName && b.productName.toLowerCase().indexOf(query) > -1) {
        result.push(b);
        console.log(result,'result')
      }
    }
  }
  return result;
}
specialitySearch(event: KeyboardEvent): void {
  const query = (event.target as HTMLInputElement).value; // Extracting value from the event
  const d = query.toLowerCase();
  console.log('fd')
  const result = this.specializationSelect(d);
  if (query === '') {
    console.log('fd')
    this.product = this.docSpecializationClone;
  } else {
    console.log('fdd')
    this.product = result;
  }
}
onButtonClick(): void {
  this.getallcount();
  this.getallcart();
}
login() {
  this.userid=localStorage.getItem('id');
  if(this.userid == null){
    this.userid = 0
  }
  this.dashboardservice.getlogin(this.userid).subscribe(res => {
      this.data = res;
      if (this.data.status === 0) {  
          this.logindetail = this.data.response;
          
      } else {
          // Handle other cases if needed
      }
  });
}
forgotpasssword(){
  this.loginn =false;
}
signnin(){
    this.loginn =true;
}
forgotpassword(){
 
  let data =
  {
    username:this.forgotpasswordform.value.email
  }
  this.dashboardservice.forgotpassword(data).subscribe((res:any) => {
    if (res.status == 0) {
      this.matsnackbar.open(res.response, 'x', { duration: 2000 });
      this.SignUpForm.reset();
      // this.router.navigate(['/dashboard'], { relativeTo: this.route.parent });
      // const dropdownToggle = document.querySelector('.dropdown-toggle');
      // if (dropdownToggle) {
      //   dropdownToggle.classList.remove('show');
      // }
    }
    else {
      this.matsnackbar.open(res.response, 'x', { duration: 2000 });
    }
  })
}
clear(){
  this.searchproduct.patchValue({
    name:'',
 
  })
  this.getallproduct()
}
onInputChange(value: any) {
  this.inputText = value.trim();
  if (this.inputText) {
    // Filter products based on input text
    this.product = this.product.filter((item:any) =>
      item.productName.toLowerCase().includes(this.inputText.toLowerCase())
    );
  } else {
    this.product = [];
  }
}
}