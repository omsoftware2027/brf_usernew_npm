import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin-popup',
  templateUrl: './signin-popup.component.html',
  styleUrls: ['./signin-popup.component.scss']
})
export class SigninPopupComponent {
  formGroup!:FormGroup
  constructor( private formBuilder:FormBuilder){

  }
  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
