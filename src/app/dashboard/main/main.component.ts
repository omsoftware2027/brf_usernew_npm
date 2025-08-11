import { Component } from '@angular/core';
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
    public authService: AuthService
  ) {
    this.userid = this.route.snapshot.params['id'];
    console.log(this.userid,'this.userid')
    this.token = this.route.snapshot.params['token'];
    this.usertype = this.route.snapshot.params['userType'];
    this.type = this.route.snapshot.params['type'];
    localStorage.setItem('id', this.userid);
    // localStorage.setItem('token',this.token);
    this.authService.setToken(this.token)
    // localStorage.setItem('usertype',this.usertype);
    this.authService.setUserType(this.usertype);
    // localStorage.setItem('isPathologyAccessible',this.accesstype);
    if(this.type=='user'){
      this.reloadCommonService.sendUpdate('reloadNavbar');
    } 
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    $.getScript('./assets/js/analytics-dashboard.js');
  }
}
