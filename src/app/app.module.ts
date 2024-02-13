import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient , HTTP_INTERCEPTORS} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerInterceptor } from './helper/spinner/spinner.interceptor';
import { AuthErrorInterceptor } from './helper/authErrorlogout/auth-error.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import * as $ from 'jquery';
import { OrderDetailComponent } from './order-detail/order-detail.component';



// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true,
//   wheelPropagation: false
// };

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    OrderDetailComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatFormFieldModule,
    //PerfectScrollbarModule,
    SharedModule,
    ReactiveFormsModule,
    MdbCarouselModule
  ],
  providers: [
    //{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
