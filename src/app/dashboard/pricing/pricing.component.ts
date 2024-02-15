import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  linkname:any;
constructor(private dashboardservice:DashboardService,private route:ActivatedRoute){

}
ngOnInit(): void {
  this.linkname = this.route.snapshot.params['linkname'];
  this.getfooterinstantsaving();

  // this.getAllcategoryproduct();
}
getfooterinstantsaving() {
  this.dashboardservice.getalllinkname(this.linkname).subscribe((res) => {
    if (res.status === 0) {
      this.linkname = res['response'];
    
    }
  });

} 
}
