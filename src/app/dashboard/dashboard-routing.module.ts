import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ViewProductDetailComponent } from './view-product-detail/view-product-detail.component';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { MyCartListComponent } from './my-cart-list/my-cart-list.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
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



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AnalyticsComponent,
        data: {
          title: 'Analytics'
        }
      },
      {
        path: 'category-detail/:id',
        component: CategoryDetailComponent,
        data: {
          title: 'categorydetail'
        }
      },
      {
        path: 'view-product-detail/:id',
        component: ViewProductDetailComponent,
        data: {
          title: 'viewcategorydetail'
        }
      },
      {
        path: 'add-wishlist',
        component: AddWishlistComponent,
        data: {
          title: 'addwishlist'
        }
      },
      {
        path: 'my-cart-list',
        component: MyCartListComponent,
        data: {
          title: 'mycartlist'
        }
      },
      {
        path: 'checkout-page',
        component: CheckoutPageComponent,
        data: {
          title: 'checkoutpage'
        }
      },
      {
        path: 'location',
        component: LocationComponent,
        data: {
          title: 'location'
        }
      },
      {
        path: 'account-detail',
        component: AccountDetailComponent,
        data: {
          title: 'accountdetail'
        }
      },
      {
        path: 'statement/:id',
        component: StatementComponent,
        data: {
          title: 'statement'
        }
      },
      {
        path: 'meat-markets',
        component: MeatMarketsComponent,
        data: {
          title: 'meat market'
        }
      },
      {
        path: 'br-food-services/:id',
        component: BrFoodServicesComponent,
        data: {
          title: 'br food service'
        }
      },
      {
        path: 'pricing',
        component: PricingComponent,
        data: {
          title: 'pricing'
        }
      },
      {
        path: 'credit-cards',
        component: CreditCardsComponent,
        data: {
          title: 'credit-cards'
        }
      },
      
      {
        path: 'privacy-right',
        component: PrivacyRightComponent,
        data: {
          title: 'privacy right'
        }
      },
      {
        path: 'return-policy/:id',
        component: ReturnPolicyComponent,
        data: {
          title: 'return policy'
        }
      },
      {
        path: 'order-hours',
        component: OrderHoursComponent,
        data: {
          title: 'order hours'
        }
      },
      {
        path: 'get-reminders',
        component: GetRemindersComponent,
        data: {
          title: 'get reminders'
        }
      },
      {
        path: 'site-map/:id',
        component: SiteMapComponent,
        data: {
          title: 'site map'
        }
      },
      {
        path: 'new-customers/:id',
        component: NewCustomersComponent,
        data: {
          title: 'new customers'
        }
      },

      {
        path: 'blog',
        component: BlogComponent,
        data: {
          title: 'blog'
        }
      },
      {
        path: 'sign-in',
        component: SignInComponent,
        data: {
          title: 'sign in '
        }
      },
      {
        path: 'all-product/:name',
        component: AllProductComponent,
        data: {
          title: 'all product'
        }
      },
      {
        path: 'all-product',
        component: AllProductComponent,
        data: {
          title: 'all product'
        }
      },
      {
        path: 'manage-cartt/:id',
        component:ManageCarttComponent,
        data: {
          title: 'manage cart'
        }
      },

        {
        path: 'my-cart-list/:id',
        component: MyCartListComponent,
        data: {
          title: 'mycartlist'
        }
      },


      // {
      //   path: '',
      //   component: AnalyticsComponent,
      //   data: {
      //     title: 'Analytics'
      //   }
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
