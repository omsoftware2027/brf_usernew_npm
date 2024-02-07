import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-customers',
  templateUrl: './new-customers.component.html',
  styleUrls: ['./new-customers.component.scss']
})
export class NewCustomersComponent {
  serviceid:any
  cmsRes3:any;
  constructor(private dashboardservice:DashboardService, private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.serviceid = this.route.snapshot.params['id'];
    this.getuseractivitybyid();
  
    // this.getAllcategoryproduct();
  }
  getuseractivitybyid() {
    this.dashboardservice.getallcmsdatabyid(this.serviceid).subscribe((res) => {
      if (res.status === 0) {
        this.cmsRes3 = res.response
      }
    });

} 
}
