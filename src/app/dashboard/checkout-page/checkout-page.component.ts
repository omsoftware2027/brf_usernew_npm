import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninPopupComponent } from 'src/app/shared/signin-popup/signin-popup.component';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
 
constructor( private dialog:MatDialog){

}
ngOnInit(): void {
}
  openeclinicAcessDialog(): void {
    this.dialog.open(SigninPopupComponent, {
      width: '1000px',
     
    });
  }
}
