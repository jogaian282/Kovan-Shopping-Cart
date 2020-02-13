import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductItemService } from 'src/app/shared/services/product-item.service';
import { sessionStorageKey } from 'src/app/shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'kovan-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, DoCheck {

  // Initialize variables.
  public cartItemsWithoutDuplicate: any[] = [];
  public cartItemsAdded: any[];
  public totalAmount: number;
  public cartDetailsList: any[] = [];

  // Access modifiers - private.
  private cartQuantity: number;

  constructor(
    private productItemService: ProductItemService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.cartItemsAdded = this.productItemService.getProductItems(sessionStorageKey);
    this.productItemService.cartAddedCount.asObservable().subscribe((qty: number) => {
      this.cartQuantity = qty;
    });
    if (this.cartItemsAdded !== null && this.cartItemsAdded.length > 0) {
      const obj = {};
      this.cartItemsAdded.forEach(function(item) {
        obj[item.partId] ? obj[item.partId]++ : obj[item.partId] = 1;
      });
      this.updateCartItemWithQuantity(obj);
    }
  }

  /**
   * @description - Method to load updated cart items with quantity.
   * @param - { any } obj.
  */
  private updateCartItemWithQuantity(obj: any): void {
    this.cartItemsAdded.map(cartItem => this.cartItemsWithoutDuplicate.
    filter(item => item.cartItem.partId === cartItem.partId).length > 0 ? null :
    Object.assign([], this.cartItemsWithoutDuplicate.push({
      'cartItem': cartItem,
      'quantity': obj
    })));
    this.cartItemsWithoutDuplicate.forEach((value: any) => {
      this.calculatePriceByQuantity(value.cartItem, value.quantity[value.cartItem.partId]);
    });
  }

  ngDoCheck() {
    this.calculateTotal();
  }

  /**
   * @description - Method to remove cart item.
   * @param - { number } selectedIndex.
  */
  public removeItem(selectedIndex: number): void {
    if (this.cartItemsWithoutDuplicate.length > 0) {
      this.cartItemsWithoutDuplicate.splice(selectedIndex, 1);
      this.productItemService.cartItemCount(this.cartQuantity - 1);
      this.productItemService.setProductItems(sessionStorageKey, this.cartItemsWithoutDuplicate);
      this.cartDetailsList.forEach((cartDetails: any, index: number) => {
        this.cartItemsWithoutDuplicate.forEach(items => {
          if (cartDetails.partId !== items.cartItem.partId) {
            this.cartDetailsList.splice(index, 1);
          }
        });
      });
    }
  }

  /**
   * @description - Method to calculate price by qty.
   * @param - { selectedItem } any.
   * @param - { string } qty.
  */
  public calculatePriceByQuantity(selectedItem: any, qty: string) {
    this.cartItemsWithoutDuplicate.forEach((item) => {
      if (item.cartItem.partId === selectedItem.partId) {
        const obj = {};
        const replaceCommaInPrice = selectedItem !== null ? selectedItem.priceValue.replace(/\,/g, '') : null;
        obj['title'] = item.cartItem.title;
        obj['price'] = parseInt(replaceCommaInPrice, 10) * Number(qty);
        obj['partId'] = item.cartItem.partId;
        for (let index = 0; index < this.cartDetailsList.length; index++) {
          if (this.cartDetailsList[index].partId === obj['partId']) {
            this.cartDetailsList.splice(index, 1);
          }
        }
        this.cartDetailsList.push(obj);
      }
    });
  }

  /**
   * @description - Method to calculate total amount.
  */
  private calculateTotal() {
    this.totalAmount = this.cartDetailsList.reduce((initialValue: number, productItem: any) => {
      return Number(initialValue) + parseInt(productItem.price, 10);
    }, 0);
  }

  /**
   * @description - Method to checkout.
  */
  public addToCheckOut() {
    this.snackBar.open('Success', 'Close', {
      'horizontalPosition': 'center',
      'verticalPosition': 'top',
      'duration': 2000,
      'panelClass': 'success-snackbar'
    });
  }

}
