import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/shared/signin-popup/signin-popup.component';
import { AddNewUserPopupComponent } from '../add-new-user-popup/add-new-user-popup.component';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent {
  formGroup!:FormGroup;
  showmyprfile: boolean = true;
  showmypassword: boolean = false;
  showorder:boolean=false;
  Bulkorder:boolean=false;
  Orderguide:boolean=false;
  Mystaff:boolean=false;
  Myaddress:boolean=false;
  constructor(private formBuilder:FormBuilder, private dialog:MatDialog){

  }
  ngOnInit() {
 
    this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
   
}
showSignInForm() {
  this.showmyprfile = true;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;

}

showpassword() {
  this.showmyprfile = false;
  this.showmypassword = true;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;
}
myorder() {
  this.showmyprfile = false;
  this.showmypassword = false;
  this.showorder=true;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;
}
bulkorder(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=true;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=false;
}
orderguide(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=true;
  this.Mystaff=false;
  this.Myaddress=false;
}
mystaff(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=true;
  this.Myaddress=false;
}
myaddress(){
  this.showmyprfile = false;
  this.showmypassword = false;
  this.showorder=false;
  this.Bulkorder=false;
  this.Orderguide=false;
  this.Mystaff=false;
  this.Myaddress=true;
}
openeclinicAcessDialog(): void {
  this.dialog.open(SigninPopupComponent, {
    width: '914px',
    height:'584px'
   
  });
}
openewuserdialog(): void {
  this.dialog.open(AddNewUserPopupComponent, {
    width: '914px',
    height:'584px'
   
  });
}
}
