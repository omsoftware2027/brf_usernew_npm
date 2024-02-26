import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.scss']
})
export class CreditCardsComponent {
  linkname:any;
  descripation:any;
  constructor(private dashboardservice:DashboardService,private route:ActivatedRoute,private sanitizer: DomSanitizer){
  
  }
  ngOnInit(): void {
    this.linkname = this.route.snapshot.params['linkname'];
    this.getfooterinstantsaving();
  
    // this.getAllcategoryproduct();
  }
  getfooterinstantsaving() {
    this.dashboardservice.getalllinkname(this.linkname).subscribe((res:any) => {
      if (res.status === 0) {
        // this.linkname = res['response'];
        this.linkname = this.sanitizer.bypassSecurityTrustHtml(res.response.cmsTitle)
        this.descripation =this.sanitizer.bypassSecurityTrustHtml(res.response.description)
      
      }
    });
  
  } 
}
