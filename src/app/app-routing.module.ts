import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-signup', component: SellerSignupComponent },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-addProduct',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'seller-updateProduct/:id',
    component: UpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search-product/:query',
    component: SearchProductComponent,
  },
  {
    path: 'product-details/:productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'user-signup',
    component: UserSignupComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
