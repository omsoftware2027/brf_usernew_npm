import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  
	constructor(private router: Router, private route: ActivatedRoute) { }
  
  
	// On Login link click
	onLogin() {
	  this.router.navigate(['login'], { relativeTo: this.route.parent });
	}

  ngOnInit(): void {
    // $(document).ready(function () {
	// 		$("#show_hide_password a").on('click', function (event) {
	// 			event.preventDefault();
	// 			if ($('#show_hide_password input').attr("type") == "text") {
	// 				$('#show_hide_password input').attr('type', 'password');
	// 				$('#show_hide_password i').addClass("bx-hide");
	// 				$('#show_hide_password i').removeClass("bx-show");
	// 			} else if ($('#show_hide_password input').attr("type") == "password") {
	// 				$('#show_hide_password input').attr('type', 'text');
	// 				$('#show_hide_password i').removeClass("bx-hide");
	// 				$('#show_hide_password i').addClass("bx-show");
	// 			}
	// 		});
	// 	});
  }

}
