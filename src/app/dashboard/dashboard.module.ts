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
import { BrFoodServicesComponent } from './br-food-services/br-food-services.component';
import { PricingComponent } from './pricing/pricing.component';
import { CreditCardsComponent } from './credit-cards/credit-cards.component';
import { LocationComponent } from './location/location.component';
import { PrivacyRightComponent } from './privacy-right/privacy-right.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { OrderHoursComponent } from './order-hours/order-hours.component';
import { GetRemindersComponent } from './get-reminders/get-reminders.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { NewCustomersComponent } from './new-customers/new-customers.component';
import { BlogComponent } from './blog/blog.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ManageCarttComponent } from './manage-cartt/manage-cartt.component';
import { OrderDetailComplatedComponent } from './order-detail-complated/order-detail-complated.component';
import { EmailSignupComponent } from './email-signup/email-signup.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MainComponent } from './main/main.component';
import { InventoryPopupComponent } from './account-detail/inventory-popup/inventory-popup.component';

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
    BrFoodServicesComponent,
    PricingComponent,
    CreditCardsComponent,
    LocationComponent,
    PrivacyRightComponent,
    ReturnPolicyComponent,
    OrderHoursComponent,
    GetRemindersComponent,
    SiteMapComponent,
    NewCustomersComponent,
    BlogComponent,
    SignInComponent,
    AllProductComponent,
    ManageCarttComponent,
    OrderDetailComplatedComponent,
    EmailSignupComponent,
    MainComponent,
    InventoryPopupComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    DashboardRoutingModule,
    MdbCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonModule,
  
  
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
