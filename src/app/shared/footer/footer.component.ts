import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private dashboardservice:DashboardService,private snackBar:MatSnackBar,private formBuilder:FormBuilder){
    this.footeremailform=this.formBuilder.group({
      email:[''],
    })
  }
    ngOnInit() {
       this.getfootergeneral();
       this.getfootercustomer();
       this.getfooterorder();
       this.getfooterdelivery();
       this. getcustomercontact();
       this. getsocialmediaurl();

      
    }

    getfootergeneral() {
        this.dashboardservice.getallcmsdata(this.cmsEnum).subscribe((res) => {
          if (res.status === 0 && res['response'].length > 0) {
            this.titlesAndIdsArray1 = res['response'].map((item: { title: any; cmsId: any; }) => ({
              title: item.title,
              cmsId: item.cmsId
            }));
          }
        });
    
    } 
    getfootercustomer() {
      this.dashboardservice.getallcmsdata(this.cmsEnum2).subscribe((res) => {
        if (res.status === 0 && res['response'].length > 0) {
          this.titlesAndIdsArray = res['response'].map((item: { title: any; cmsId: any; }) => ({
            title: item.title,
            cmsId: item.cmsId
          }));
        }
      });
    }
    getfooterorder() {
        this.dashboardservice.getallcmsdata(this.cmsEnum3).subscribe((res) => {
          if (res.status === 0) {
            this.cmsRes2 = res['response'];
          
          }
        });
    
    } 
    getfooterdelivery() {
        this.dashboardservice.getallcmsdata(this.cmsEnum4).subscribe((res) => {
          if (res.status === 0) {
            this.cmsRes3 = res['response']; 
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
  //   getfooterinstantsaving(linkname:any) {
  //     this.dashboardservice.getalllinkname(linkname).subscribe((res) => {
  //       if (res.status === 0) {
  //         this.linkname = res['response'];
        
  //       }
  //     });
  
  // } 
}
