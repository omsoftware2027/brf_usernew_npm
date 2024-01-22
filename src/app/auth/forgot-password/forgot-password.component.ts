import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute) { }

	// On Login link click
	onLogin() {
	  this.router.navigate(['login'], { relativeTo: this.route.parent });
	}


  ngOnInit(): void {
  }

}
