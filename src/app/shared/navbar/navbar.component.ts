import { Component , ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
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
    carttotal:any;
    wishcart:any;
    wishlist:any;
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
    id:any;
    cmsEnum ='HEADER'
    cmsRes4:any
    // submitted:boolean = false;
    name:any;
    data: any;
    category:any;
    page: number = 0;
    size: number = 30;
   currentPage = 0;
    pageSize = 500;
   
    token: any;
    loginTime:any;
    sessionId:any;
    formGroup!:FormGroup
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
        public sidebarservice: SidebarService,public dialog: MatDialog,private formBuilder: FormBuilder,private matsnackbar:MatSnackBar,private dashboardservice:DashboardService,private route: ActivatedRoute) {
          this.searchproduct = this.formBuilder.group({
            name: [''],
            categoryId:['']
          });
            setInterval(() => {
                this.currentDataTime = new Date();
              }, 1);
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
      
        this.token = localStorage.getItem('token');
        this.loginTime = localStorage.getItem('loginTime');
        this.sessionId = localStorage.getItem('sessionId');
        this.getfootergeneral();
        this.getTeams();
        this.tabelLoad(0);
        this.getallcount()
        this.getallproduct();
        this.getallcart() ;
        
        this.formGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
          });
          this.SignUpForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            firstName: ['',Validators.required],
            lastName:['',Validators.required],
            mobile:['',Validators.required],
            

          });
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
        // this.router.navigate(['/civantage'], { relativeTo: this.route.parent });
        this.submitted=true;
      if(this.formGroup.valid){
        const loginpayload ={
          email: this.formGroup.value.email,
          password: this.formGroup.value.password,
  
         };
  
         this.dashboardservice.login(loginpayload).subscribe(data => {
           this.loginData = data;   
           localStorage.setItem('id', this.loginData.response.id);
           localStorage.setItem('token', this.loginData.response.token);
           console.log(this.loginData.response.id,'loginData');
           this.matsnackbar.open("Login Successfully", 'x', { duration: 2000 });
           if (this.dropdownMenu.nativeElement.classList.contains('show')) {
            this.dropdownMenu.nativeElement.classList.remove('show');
          }
          this.formGroup.reset();
          //  if (this.dropdownMenu.nativeElement.classList.contains('show')) {
          //   this.dropdownMenu.nativeElement.classList.remove('show');
          // }

           // @ts-ignore
          //  if (data && data.value === 'Not Authorized') {
          //  this.matsnackbar.open('Wrong Username or Password Enter , try Again', '', {
          //      duration: 3000,
          //      panelClass: ['error-snackbar']
          //   });
          //    this.retryError = true;
  
          //  } else if(this.loginData && this.loginData.value  === 'Inactive'){
          
          //    this.retryError = true;
          //  } else {
           
          //    if (data && data.value === 'Another User LoggedIn') {
          //      this.matsnackbar.open('Another User LoggedIn', '', {
          //        duration: 3000,
          //        panelClass: ['error-snackbar']
          //      });
          //      } else {
          //     //    this.snackBar.open('Login Successfully', '', {
          //     //      duration: 3000,
          //     //      panelClass: ['success-snackbar']
          //     //  });
          //      this.router.navigate(['/dashboard'], { relativeTo: this.route.parent });
  
          //  }}
         }, 
         //(error => {
          // this.matsnackbar.open('Please Enter correct details', '', {
          //   duration: 3000,
          //   panelClass: ['error-snackbar']
            
       //   });
        // })
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
            this.formGroup.reset();
            // const dropdownToggle = document.querySelector('.dropdown-toggle');
            // if (dropdownToggle) {
            //   dropdownToggle.classList.remove('show');
            // }
          }
          else {
            this.matsnackbar.open("Error while updating", 'x', { duration: 2000 });
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
          this.carttotal = this.data.response.dataSet;
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
  this.dashboardservice.getcartcount(this.userid).subscribe(res => {
      this.data = res;
      if (this.data.status === 0) {  
          this.wishcart = this.data.response;
          
      } else {
          // Handle other cases if needed
      }
  });
}
onProductSelected() {
  // console.log(productId,'productId')
  const productId = this.searchproduct.value.name || '';
  if (productId) {
    this.router.navigate(['/dashboard/view-product-detail', productId]);
  }
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
}
