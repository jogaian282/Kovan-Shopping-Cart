import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

export const ShoppingCartComponents = [ ProductsComponent, CartComponent ];

export const ShoppingCartRoutes = RouterModule.forChild(routes);
