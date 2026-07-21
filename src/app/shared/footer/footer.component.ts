import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit{
    cmsRes:any;
    cmsRes1:any;
    warehouseinstantsavings:any;
    deliveryinstantsavings:any;
    email:any;
    linkname:any;
    link:any;
    cmsRes2:any;
    footeremailform:FormGroup;
    socialmedia:any;
    contact:any;
    cmsRes3:any;
    titlesAndIdsArray:any;
    titlesAndIdsArray1:any;
    cmsEnum ='GENERAL'
    cmsEnum2 ='CUSTOMER'
    cmsEnum3 ='ORDER'
    cmsEnum4 ='DELIVERY'
    submitted:boolean =false;

    footerDetails: any;

  constructor(private dashboardservice:DashboardService,private snackBar:MatSnackBar,private formBuilder:FormBuilder){
    this.footeremailform=this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
    })
  }
    ngOnInit() {
      this.getFooterData();
       this. getcustomercontact();
       this. getsocialmediaurl();
      
    }

  getFooterData() {
    this.dashboardservice.getallcmsdata('').subscribe((res) => {
      if (res.status === 0) {
        const footerData = res.response ?? {};
        Object.keys(footerData).forEach((key: string) => {
          footerData[key] = footerData[key].map((item: any) => ({
            ...item,
            slug: this.dashboardservice.generateSlug(item.title)
          }));
        });
        this.footerDetails = footerData;
      }
    });
  }

    getcustomercontact() {
      this.dashboardservice.getcontactus().subscribe((res) => {
        if (res.status === 0) {
          this.contact = res['response']; 
        }
      });
     } 
     getsocialmediaurl() {
      this.dashboardservice.getsocialmediaurl().subscribe((res) => {
        if (res.status === 0) {
          this.socialmedia = res['response']; 
        }
      });
     } 
    getfootergenralbyid(cmsId:any) {
        this.dashboardservice.getallcmsdatabyid(cmsId).subscribe((res) => {
          if (res.status === 0) {
            this.cmsRes3 = res['response']
          }
        });
    
    } 
    openurl(url:any){
      window.open(url, '_blank');
    }
    submitcart(){
      this.submitted=true;
     if(this.footeremailform.valid){
      this.dashboardservice.savesubscriction(this.footeremailform.value.email).subscribe((res:any) => {
        if (res.status == 0) {
          // this.snackBar.open("Added To Cart", 'x', { duration: 2000 });
          this.footeremailform.reset();   
        }
        else {
          this.snackBar.open(res.response, 'x', { duration: 2000 });
          this.footeremailform.reset();
        }
      })
     }
    }
  //   getfooterinstantsaving(linkname:any) {
  //     this.dashboardservice.getalllinkname(linkname).subscribe((res) => {
  //       if (res.status === 0) {
  //         this.linkname = res['response'];
        
  //       }
  //     });
  
  // } 
}
