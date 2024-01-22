import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ViewProductDetailComponent } from './view-product-detail/view-product-detail.component';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { MyCartListComponent } from './my-cart-list/my-cart-list.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';


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
        path: 'category-detail',
        component: CategoryDetailComponent,
        data: {
          title: 'categorydetail'
        }
      },
      {
        path: 'view-product-detail',
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
        path: 'account-detail',
        component: AccountDetailComponent,
        data: {
          title: 'accountdetail'
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
