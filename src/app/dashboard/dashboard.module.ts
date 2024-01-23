import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { AnalyticsComponent } from './analytics/analytics.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from '../shared/material/material.module';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ViewProductDetailComponent } from './view-product-detail/view-product-detail.component';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { MyCartListComponent } from './my-cart-list/my-cart-list.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AddNewUserPopupComponent } from './add-new-user-popup/add-new-user-popup.component';
import { StatementComponent } from './statement/statement.component';
import { MeatMarketsComponent } from './meat-markets/meat-markets.component';

@NgModule({
  declarations: [
    AnalyticsComponent,
    CategoryDetailComponent,
    ViewProductDetailComponent,
    AddWishlistComponent,
    MyCartListComponent,
    CheckoutPageComponent,
    AccountDetailComponent,
    AddNewUserPopupComponent,
    StatementComponent,
    MeatMarketsComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    DashboardRoutingModule,
    MdbCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
