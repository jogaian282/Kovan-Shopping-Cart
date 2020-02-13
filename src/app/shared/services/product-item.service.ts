import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItemStorageService } from './cart-item-storage.service';

@Injectable({
  providedIn: 'root'
})

export class ProductItemService {

  // Initialize variables.
  public cartAddedCount = new BehaviorSubject<number>(0);

  constructor(private cartItemStorageService: CartItemStorageService) { }

  /**
   * @description - Method to get product items.
   * @param - { string } key.
  */
  public getProductItems(key: string) {
    return this.cartItemStorageService.get(key);
  }

  /**
   * @description - Method to set product items.
   * @param - { string } key.
   * @param - { any[] } value.
  */
  public setProductItems(key: string, value: any[]) {
    this.cartItemStorageService.set(key, value);
  }

  /**
   * @description - Method to update cart added items.
   * @param - { number } itemCount.
  */
  public cartItemCount(itemCount: number) {
    this.cartAddedCount.next(itemCount);
  }

}
