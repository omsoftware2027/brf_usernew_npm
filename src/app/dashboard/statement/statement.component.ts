import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent {
  serviceid:any
  cmsRes3:any;
  cmsRestitle:any;
  cmsresdescrption:any;
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
        this.cmsRestitle = res.response.cmsTitle
        this.cmsresdescrption=res.response.description
      }
    });

} 
}
