import { Component , OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SigninPopupComponent } from '../signin-popup/signin-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    showSignIn: boolean = true;
    showSignUp: boolean = false;
    name:any;
    data: any;
    id:any;
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
        public sidebarservice: SidebarService,public dialog: MatDialog,private formBuilder: FormBuilder) {
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
        this.id = localStorage.getItem('Id');
        this.token = localStorage.getItem('token');
        this.loginTime = localStorage.getItem('loginTime');
        this.sessionId = localStorage.getItem('sessionId')
        this.getTeams();
        this.formGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
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
        e.preventDefault();
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }
    openeclinicAcessDialog(): void {
        this.dialog.open(SigninPopupComponent, {
          width: '500px',
         
        });
      }


      ondropdownclick(){
        console.log('dropdownopen')
      }
      showSignInForm() {
        this.showSignIn = true;
        this.showSignUp = false;
      }
    
      showSignUpForm() {
        this.showSignIn = false;
        this.showSignUp = true;
      }
}
