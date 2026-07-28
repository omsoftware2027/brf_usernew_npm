import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MasterService } from 'src/app/services/master-service/master.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  userid:any;
  token:any;
  type:any;
  usertype:any

  constructor(private route: ActivatedRoute,
    private reloadCommonService:MasterService,
    private router: Router,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userid = this.route.snapshot.params['id'];
    console.log(this.userid,'this.userid')
    this.token = this.route.snapshot.params['token'];
    this.usertype = this.route.snapshot.params['userType'];
    this.type = this.route.snapshot.params['type'];
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('id', this.userid);
    }
    this.authService.setToken(this.token)  
    this.authService.setUserType(this.usertype);
    if(this.type=='user'){
      this.reloadCommonService.sendUpdate('reloadNavbar');
    } 
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
       $.getScript('./assets/js/analytics-dashboard.js');
     }
  }
}
