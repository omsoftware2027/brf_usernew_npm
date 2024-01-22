import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-user-popup',
  templateUrl: './add-new-user-popup.component.html',
  styleUrls: ['./add-new-user-popup.component.scss']
})
export class AddNewUserPopupComponent {
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
