import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-manage-cartt',
  templateUrl: './manage-cartt.component.html',
  styleUrls: ['./manage-cartt.component.scss']
})
export class ManageCarttComponent {
  userid:any;
  currentPage=0;
  pageSize=30;
  reorder:any;
  orderid:any;
constructor(
  public dashboardservice:DashboardService,
  private route:ActivatedRoute,
  @Inject(PLATFORM_ID) private platformId: Object
){

}
ngOnInit() {
  this.orderid = this.route.snapshot.params['id'];
  this.getallorder(); 
}

  getallorder(){
    if (isPlatformBrowser(this.platformId)) {
      this.userid=localStorage.getItem('id');
    }
    this.dashboardservice.getallreorder(this.orderid,this.userid).subscribe((res:any)=>{
      if(res.status ==0){
      this.reorder=res.response.dataSet
     
      }
    }
    )
  }

}
