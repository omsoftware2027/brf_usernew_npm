import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-return-policy',
  templateUrl: './return-policy.component.html',
  styleUrls: ['./return-policy.component.scss']
})
export class ReturnPolicyComponent {
  serviceid:any
  cmsRes3:any;
  cmsRestitle:any;
  cmsresdescrption:any;
  constructor(private dashboardservice:DashboardService, private route: ActivatedRoute,private sanitizer: DomSanitizer){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve the 'id' parameter from the route
      this.serviceid = params.get('id');
      
      // Call your function every time the 'id' parameter changes
      this.getuseractivitybyid();
    });
  }
  
    // this.getAllcategoryproduct();
  
  getuseractivitybyid() {
    this.dashboardservice.getallcmsdatabyid(this.serviceid).subscribe((res) => {
      if (res.status === 0) {
        this.cmsRestitle = this.sanitizer.bypassSecurityTrustHtml(res.response.cmsTitle)
        // this.cmsresdescrption=res.response.description
        this.cmsresdescrption = this.sanitizer.bypassSecurityTrustHtml(res.response.description);
        console.log( this.cmsRestitle,' this.cmsRestitle')
      }
    });

} 
}
