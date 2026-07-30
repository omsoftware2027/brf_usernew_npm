import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { SigninPopupComponent } from '../signin-popup/signin-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInComponent } from 'src/app/dashboard/sign-in/sign-in.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { MatSort } from '@angular/material/sort';
import { MasterService } from 'src/app/services/master-service/master.service';
import { AuthService } from 'src/app/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  productname = new FormControl('');
  @ViewChild('dropdownList') dropdownList!: ElementRef;
  @ViewChild('listItem') listItem!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  // @HostListener('document:click', ['$event'])
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('dropdownWrapper') dropdownWrapper!: ElementRef;

  firstTimeLogin: string | null = null
  showDropdown: boolean = false;
  titlesAndIdsArray2: any;
  carttotal: any;
  orderId: any;
  addressdetail: any;
  isInputFilled: boolean = false;
  userId: any;
  productt: any;
  totalrecordLengthh: any;
  carttotalt: any;
  wishcart: any;
  wishlist: any;
  logindetail: any
  dropdownopen: boolean = true;
  userid: any;
  showSignIn: boolean = true;
  showSignUp: boolean = false;
  addOnUpdate: boolean = false;
  totalrecordLength: any;
  showLine3InSignIn: boolean = true;
  showLine4InSignIn: boolean = false;
  showLine3InSignUp: boolean = false;
  showLine4InSignUp: boolean = true;
  submitted: boolean = false;
  loginFormGroup!: FormGroup;
  SignUpForm!: FormGroup;
  searchproduct!: FormGroup;
  retryError = false;
  loginData: any;
  product: any;
  orderDetails: any
  usertype: any;
  id: any;
  customerdetail: any
  cmsEnum = 'HEADER'
  cmsRes4: any
  // submitted:boolean = false;
  name: any;
  productDetails: any;
  orderItemId: any;
  data: any;
  messageReceived: any;
  category: any;
  docSpecializationClone: any;
  page: number = 0;
  size: number = 30;
  currentPage = 0;
  pageSize = 500;
  loginn: boolean = true;
  token: string | null = null;
  orangeline = true;
  showLine3: boolean = true;
  showLine4: boolean = false;
  grayline = false;
  loginTime: any;
  sessionId: any;
  formGroup!: FormGroup
  forgotpasswordform!: FormGroup;
  toogleBtn: boolean = false;
  activeRoute: any = 'home';
  fieldTextType: boolean = false;
  fieldTextType1: boolean = false;
  tabs: { [key: string]: boolean } = {
    'pills-manage-doc': false,
    'pills-alfa-dev': false,
    'pills-stocklist': false
  };
  listMenuItems: any = [
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
  alphaDevMenuItem: any = [
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
  currentDataTime: any = new Date();
  @ViewChild('filterModal') filterModal!: TemplateRef<any>;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private renderer: Renderer2,
    public authService: AuthService,
    public sidebarservice: SidebarService,
    private elementRef: ElementRef,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private matsnackbar: MatSnackBar,
    private dashboardservice: DashboardService,
    private route: ActivatedRoute,
    private reloadCommonService: MasterService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.searchproduct = this.formBuilder.group({
      productname: [''],
      categoryId: ['']
    });

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.forgotpasswordform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.SignUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.checkIfMatchingPasswords('password', 'confirmPassword'),
    }
    );
  }

  ngOnInit() {
    this.dashboardservice.searchText$.subscribe(search => {
      this.searchproduct.patchValue(
        {
          productname: search
        },
        { emitEvent: false }
      );
      if (!search) {
        this.product = [];
        this.showDropdown = false;
      }
    });

    this.authService.token$.subscribe(token => {
      this.token = token;
    });
    this.authService.userType$.subscribe(userType => {
      this.usertype = userType;
    })

    this.reloadCommonService.getUpdate().subscribe
      (message => {
        this.messageReceived = message;
        if (this.messageReceived.text == 'reloadNavbar') {
          this.loadNavbarData();
        } else if (this.messageReceived.text == 'reloadWalletDetail') {
          this.getallcart();
          this.getallcount();
          this.getmyorderbyorderid();
          this.getallcarttotal(0);
          this.getorderbyorderid();
        }
      });

    if (isPlatformBrowser(this.platformId)) {
      this.name = localStorage.getItem('name');
      this.userId = localStorage.getItem('id');
      this.loginTime = localStorage.getItem('loginTime');
      this.sessionId = localStorage.getItem('sessionId');
    }
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.firstTimeLogin = localStorage.getItem('firstTimeLogin');

        if (this.firstTimeLogin === 'true') {
          this.router.navigateByUrl('/account-detail');
        }
      }, 6000);
    }

    if (isPlatformBrowser(this.platformId)) {
      const tabContents = document.querySelectorAll(".tab-pane");
      tabContents.forEach(tabContent => {
        tabContent.addEventListener("click", () => {
          tabContent.classList.toggle("show");
        });
      });
    }
    this.loadNavbarData();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.showDropdown) return;
    if (this.dropdownWrapper && !this.dropdownWrapper.nativeElement.contains(event.target)) {
      this.showDropdown = false;
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = '';
      }
    }
  }

  loadNavbarData() {
    this.getfootergeneral();
    this.tabelLoad(0);
    this.getallcount();
    this.getallproduct();
    this.getallcart();
    this.login();
    this.getallcarttotal(0);
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  get confirmPassword(): any {
    return this.SignUpForm.get('confirmPassword');
  }

  checkIfMatchingPasswords(newpwd: string, confirmpwd: string): any {
    return (group: FormGroup) => {
      const passwordInput = group.controls[newpwd],
        passwordConfirmationInput = group.controls[confirmpwd];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  keyPressAlphabets(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 97 && charCode <= 122) || (charCode >= 65 && charCode <= 90) || charCode === 32) {
      return true;
    }
    else {
      return false;
    }
  }

  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.form-control')) {
      this.productname.setValue('');
    }
  }


  logout(e: any): any {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('Id');
    }
    this.authService.clearToken();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('loginTime');
    }
  }
  openeclinicAcessDialog(): void {
    this.dialog.open(SigninPopupComponent, {
      width: '500px',

    });
  }

  showSignInForm(event: Event) {
    event.stopPropagation();
    this.showSignIn = true;
    this.showSignUp = false;
    this.loginn = true;
    this.showLine3InSignIn = true;
    this.showLine4InSignIn = false;
    this.showLine3InSignUp = false;
    this.showLine4InSignUp = true;
  }
  line() {
    this.orangeline == true;
    this.grayline == false;
  }
  line1() {
    this.orangeline == false;
    this.grayline == true;
  }
  showSignUpForm(event: Event) {
    event.stopPropagation();
    this.showSignIn = false;
    this.showSignUp = true;
    this.showLine3InSignIn = false;
    this.showLine4InSignIn = true;
    this.showLine3InSignUp = true;
    this.showLine4InSignUp = false;
  }
  logoutaccount(): void {
    var dia = this.dialog.open(SignInComponent, {
      width: '400px',
    });
    dia.afterClosed().subscribe(result => {
      this.loadNavbarData();
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
      this.dashboardservice.login(loginpayload).subscribe(data => {
        this.loginData = data;
        if (this.loginData.status === 0) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('id', this.loginData.response.id);
          }
          const token = this.loginData.response.token;
          this.authService.setToken(token);
          this.authService.setUserType(this.loginData.response.userType)
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('firstTimeLogin', this.loginData.response.firstTimeLogin);
          }
          this.router.navigate(['/']);
          this.loadNavbarData();
          this.matsnackbar.open("Login Successfully", 'x', { duration: 2000 });

          if (this.dropdownMenu.nativeElement.classList.contains('show')) {
            this.dropdownMenu.nativeElement.classList.remove('show');
          }
          this.formGroup.reset();
        } else if (this.loginData.status === -1) {
          this.matsnackbar.open(this.loginData.response, 'x', { duration: 2000 });
        } else {
          this.router.navigate(['/main/' + this.loginData.response.id + '/' + this.loginData.response.token]);
        }
      },
        error => {
          this.matsnackbar.open(this.loginData.response, 'x', { duration: 2000 });
        });
    }
  }



  submit() {
    this.submitted = true;
    if (this.SignUpForm.valid) {
      let data = {
        email: this.SignUpForm.value.email,
        firstName: this.SignUpForm.value.firstName,
        lastName: this.SignUpForm.value.lastName,
        mobile: this.SignUpForm.value.mobile,
        password: this.SignUpForm.value.password,
      }
      this.dashboardservice.signup(data).subscribe((res) => {
        if (res.status == 0) {
          this.matsnackbar.open("Sign Up  Successfully", 'x', { duration: 2000 });
          if (this.dropdownMenu.nativeElement.classList.contains('show')) {
            this.dropdownMenu.nativeElement.classList.remove('show');
          }
          this.SignUpForm.reset();
        }
        else {
          this.matsnackbar.open(res.response, 'x', { duration: 2000 });
        }
      })
    }

  }
  tabelLoad(page: number) {
    this.dashboardservice.getAllcategoryy().subscribe(res => {
      this.data = res;
      if (this.data?.status === 0) {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
        this.totalrecordLength = this.data?.response?.totalElements;
        this.category = this.data?.response?.dataSet;
      }
      else {
        this.matsnackbar.open("Something went wrong!", 'x', { duration: 2000 })
      }
    })
  }

  goToOrderGuide(path: string) {
    if (this.token) {
      this.router.navigate(['/add-wishlist']);
    } else {
      this.router.navigate(['/email-signup']);
    }
  }
  goToCart(path: string) {
    if (this.token) {
      this.router.navigate(['/my-cart-list']);
    } else {
      this.router.navigate(['/email-signup']);
    }
  }



  getfootergeneral() {
    this.dashboardservice.getallcmsdata(this.cmsEnum).subscribe((res) => {
      if (res.status === 0 && res['response'].length > 0) {
        this.titlesAndIdsArray2 = res['response'].map((item: { title: any; cmsId: any; }) => ({
          title: item.title,
          cmsId: item.cmsId,
          slug: this.dashboardservice.generateSlug(item.title)
        }));
      }
    });

  }
  getallproduct() {
    const name = this.searchproduct.value.productname || '';
    if (isPlatformBrowser(this.platformId)) {
      this.userid = localStorage.getItem('id');
    }
    this.dashboardservice.getallproduct(this.currentPage, this.pageSize, name, this.userid || '').subscribe(res => {
      this.data = res;
      if (this.data?.status === 0) {
        this.product = this.data?.response?.dataSet;
        this.docSpecializationClone = this.product;
      }
    })
  }
  searchproductbyname() {
    this.showDropdown = false;
    const name = this.searchproduct.value.productname || '';
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
      this.userid = localStorage.getItem('id');
    }
    this.dashboardservice.getallproduct(this.currentPage, this.pageSize, name, this.userid || '').subscribe(res => {
      this.data = res;

      if (this.data?.status === 0) {
        const productList = this.data?.response.dataSet || [];

        if (productList.length > 1) {
          this.productt = productList;
          this.dashboardservice.setSearchResults(this.productt);
          this.router.navigate(['/all-product'], { queryParams: { search: name } });
        } else if (productList.length === 1) {
          const productId = productList[0].productId;
          const productName = productList[0].productName;

          this.router.navigate(['/product', productId, this.dashboardservice.generateSlug(productName)]);
        } else {
        }
      } else {
      }
    });
  }

  getallselectcategory(categoryId: string, categoryName: string) {
    this.searchproduct.patchValue({
      categoryId: categoryId
    })
    if (isPlatformBrowser(this.platformId)) {
      this.userid = localStorage.getItem('id');
    }
    const slug = this.dashboardservice.generateSlug(categoryName);
    this.dashboardservice.getAllProductByCategoryId(this.currentPage, this.pageSize, categoryId, this.userid).subscribe(res => {
      this.data = res;
      if (this.data?.status === 0) {
        this.carttotal = this.data?.response?.dataSet;
        this.router.navigate(['/category', categoryId, slug]);
      } else {
      }
    });
  }
  getallcount() {
    if (isPlatformBrowser(this.platformId)) {
      this.userid = localStorage.getItem('id');
    }
    if (this.userid == null) {
      this.userid = 0
    }
    this.dashboardservice.getcountcart(this.userid).subscribe(res => {
      this.data = res;
      if (this.data?.status === 0) {
        this.wishlist = this.data?.response;
      }
    });
  }

  getallcart() {
    if (isPlatformBrowser(this.platformId)) {
      this.userid = localStorage.getItem('id');
    }
    if (this.userid == null) {
      this.userid = 0
    }
    this.dashboardservice.getcartcount(this.userid).subscribe(res => {
      this.data = res;
      if (this.data?.status === 0) {
        this.wishcart = this.data?.response;
      }
    });
  }
  getallcarttotal(page: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.userid = localStorage.getItem('id');
    }
    if (this.userid != null) {
      this.userId = this.userid
    } else {
      this.userId = 0
    }
    this.dashboardservice.getallcardtotal(this.currentPage, this.pageSize, this.userId).subscribe(res => {
      this.data = res;
      if (this.data?.status === 0) {
        this.carttotalt = this.data?.response?.total;
      }
    })
  }
  onProductSelected(event: any) {
    const target = event.target as HTMLLIElement;
    const productId = target.getAttribute('value');
    if (productId) {
      this.router.navigate(['/product', productId, this.dashboardservice.generateSlug('')]);
      this.showDropdown = false;
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = '';
      }
    }

  }

  keyPressNumbers(event: any) {
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
    if (this.docSpecializationClone) {
      for (const b of this.docSpecializationClone) {
        if (b.productName && b.productName.toLowerCase().indexOf(query) > -1) {
          result.push(b);
        }
      }
    }
    return result;
  }
  specialitySearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    const result = this.specializationSelect(query);
    if (query === '') {
      this.product = this.docSpecializationClone;
    } else {
      this.product = result;
    }
  }
  onButtonClick(): void {
    this.getallcount();
    this.getallcart();
  }
  login() {
    if (isPlatformBrowser(this.platformId)) {
      this.userid = localStorage.getItem('id');
    }
    if (this.userid == null) {
      this.userid = 0
    }
    this.dashboardservice.getlogin(this.userid).subscribe(res => {
      this.data = res;
      if (this.data?.status === 0) {
        this.logindetail = this.data?.response;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('UserDetails', JSON.stringify(this.logindetail));
        }
      }
    });
  }
  forgotpasssword() {
    this.loginn = false;
  }
  signnin() {
    this.loginn = true;
  }
  forgotpassword() {

    let data =
    {
      username: this.forgotpasswordform.value.email
    }
    this.dashboardservice.forgotpassword(data).subscribe((res: any) => {
      if (res.status == 0) {
        this.matsnackbar.open(res.response, 'x', { duration: 2000 });
        this.SignUpForm.reset();
      }
      else {
        this.matsnackbar.open(res.response, 'x', { duration: 2000 });
      }
    })
  }
  clear() {
    this.searchproduct.patchValue({
      name: '',

    })
    this.getallproduct()
  }
  handleKeyUp(event: any) {
    this.showDropdown = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
    const input = event.target.value;

    if (input.startsWith(' ')) {
      event.target.value = input.trimStart();
    }
    this.isInputFilled = event.target.value.trim() !== '';
  }

  clearr() {
    const inputElement = this.elementRef.nativeElement.querySelector('.form-control');
    if (inputElement) {
      inputElement.value = '';
      this.product = [];
    }
  }
  onInputBlur() {
    this.showDropdown = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }

  }

  openDropdown() {
    this.showDropdown = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      if (this.listItem && this.listItem.nativeElement) {
        this.listItem.nativeElement.focus();
      }
    });
  }
  }

  updateInput(productName: string) {
    this.showDropdown = false
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
    this.searchproduct?.get('productname')?.setValue(productName);
  }
  getmyorderbyorderid() {
    const serach = '';
    const orderitemid = ''
    if (isPlatformBrowser(this.platformId)) {
      this.orderId = localStorage.getItem('orderid');
    }
    this.dashboardservice.getorderbyorderid(this.currentPage, this.pageSize, this.orderId, this.userId, serach, orderitemid).subscribe(res => {
      this.data = res;
      if (this.data?.status === 0) {
        this.customerdetail = this.data?.response?.dataSet?.customerDetails;
        this.addressdetail = this.data?.response?.dataSet?.shippingDetails;
        this.productDetails = this.data?.response?.dataSet?.productDetails;
        this.orderDetails = this.data?.response?.dataSet?.orderDetails;
        this.totalrecordLengthh = this.data?.response?.totalElements;
      }
      else {
      }
    })
  }
  getorderbyorderid() {

    const serach = '';
    if (isPlatformBrowser(this.platformId)) {
      this.orderId = localStorage.getItem('orderid');
      this.orderItemId = localStorage.getItem('orderItemId');
    }
    this.dashboardservice.getorderbyorderid(this.currentPage, this.pageSize, this.orderId, this.userId, serach, this.orderItemId).subscribe(res => {
      this.data = res;
      if (this.data?.status === 0) {
        this.customerdetail = this.data?.response?.dataSet?.customerDetails;
        this.addressdetail = this.data?.response?.dataSet?.shippingDetails;
        this.productDetails = this.data?.response?.dataSet?.productDetails;
        this.orderDetails = this.data?.response?.dataSet?.orderDetails;
        this.totalrecordLengthh = this.data?.response?.totalElements;
      }
      else {
      }
    })
  }
}