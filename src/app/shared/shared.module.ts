import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { SpinnerComponent } from './spinner/spinner.component';
import { SigninPopupComponent } from './signin-popup/signin-popup.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        SpinnerComponent,
        NgbModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
       // PerfectScrollbarModule,
        MatTooltipModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    
    ],
    
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        SpinnerComponent,
        SigninPopupComponent,
    ],
    providers: [ ],
})
export class SharedModule { }
