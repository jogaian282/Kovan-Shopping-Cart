import { Component, OnInit } from '@angular/core';
import { HttpOperationsService } from 'src/app/shared/services/http-operations.service';
import { baseUrl, sessionStorageKey } from 'src/app/shared/constants';
import { ProductItemService } from 'src/app/shared/services/product-item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

// Interface.
export interface ShoppingItem {
  imgSrc: string;
  title: string;
  description: string;
  price: number;
}

@Component({
  selector: 'kovan-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  // Initialize variables.
  public shoppingItemsList: any[];
  public showLoader = false;

  // Access modifiers - private.
  private selectedProductItemList: any[];
  private productItemAddedCount = 0;

  // Url.
  private productsUrl = baseUrl + 'products';

  constructor(
    private httpOperationService: HttpOperationsService,
    private productItemService: ProductItemService,
    private snackBar: MatSnackBar
  ) {
    this.showLoader = true;
  }

  public ngOnInit(): void {
    this.httpOperationService.getList(this.productsUrl).subscribe((shoppingItems: any[]) => {
      this.shoppingItemsList = shoppingItems;
      this.showLoader = false;
    }, (error: HttpErrorResponse) => {
      this.snackBar.open('Error Occurred', 'Close', {
        'horizontalPosition': 'center',
        'verticalPosition': 'top',
        'duration': 2000
      });
      this.showLoader = false;
    });
    this.loadCartItemsAdded();
  }

  /**
   * @description - Method to load cart items already added.
  */
  private loadCartItemsAdded() {
    if (sessionStorage.getItem(sessionStorageKey) === null || sessionStorage.getItem(sessionStorageKey).length === 0) {
      this.selectedProductItemList = [];
      this.productItemAddedCount = 0;
    } else {
      this.selectedProductItemList = this.productItemService.getProductItems(sessionStorageKey);
      this.productItemAddedCount = this.productItemService.cartAddedCount.getValue();
    }
  }

  /**
   * @description - Method to add item to cart.
   * @param - { selectedProduct } any.
  */
  public addToCart(selectedProduct: any): void {
    this.updateProductItemCount(selectedProduct);
    this.selectedProductItemList.push(selectedProduct);
    this.productItemService.setProductItems(sessionStorageKey, this.selectedProductItemList);
    this.snackBar.open('Product added to cart successfully', 'Close', {
      'horizontalPosition': 'center',
      'verticalPosition': 'top',
      'duration': 2000,
      'panelClass': 'success-snackbar'
    });
  }

  /**
   * @description - Method to update product item count.
   * @param - { selectedProduct } any.
  */
  private updateProductItemCount(selectedProduct: any): void {
    const addedProduct = this.selectedProductItemList.find((product: any) => {
      return product.partId === selectedProduct.partId;
    });
    if (addedProduct === undefined) {
      this.productItemAddedCount = this.productItemAddedCount + 1;
      this.productItemService.cartItemCount(this.productItemAddedCount);
    }
  }

}
