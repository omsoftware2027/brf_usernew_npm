import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail-complated',
  templateUrl: './order-detail-complated.component.html',
  styleUrls: ['./order-detail-complated.component.scss']
})
export class OrderDetailComplatedComponent {
  userid:any;
  allorder:any;
  orderplaceid:any;
  projectpridations: any[] = [];
  currentPage=0;
  pageSize=30
 constructor(public dashboardservice:DashboardService,private route: ActivatedRoute){

 }
 ngOnInit(): void{
  this.orderplaceid = this.route.snapshot.params['id'];
  this.getallorder();
 }
 getallorder(){
  this.dashboardservice.getorderbyid(this.orderplaceid).subscribe((res:any)=>{
    if(res.status ==0){
    this.allorder=res.response;
    this.projectpridations=this.allorder.productProjections
    console.log(this.allorder,'order-detail-complated')
    }
  }
  )
}
}
