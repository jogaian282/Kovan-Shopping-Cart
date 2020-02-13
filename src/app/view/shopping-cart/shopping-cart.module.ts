import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShoppingCartRoutes, ShoppingCartComponents } from './shopping-cart.routing';

@NgModule({
  imports: [
    SharedModule,
    ShoppingCartRoutes
  ],
  declarations: [
    ShoppingCartComponents
  ]
})
export class ShoppingCartModule { }
