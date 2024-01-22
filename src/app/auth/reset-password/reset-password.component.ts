import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }


	// On Login link click
	onLogin() {
	  this.router.navigate(['login'], { relativeTo: this.route.parent });
	}

  ngOnInit(): void {
  }

}
