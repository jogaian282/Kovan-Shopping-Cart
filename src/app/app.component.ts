import { Component, OnInit } from '@angular/core';
import { ProductItemService } from './shared/services/product-item.service';

@Component({
  selector: 'kovan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  // Initialize variables.
  public cartItemCount: number;

  constructor(private productItemService: ProductItemService) {
    sessionStorage.clear();
  }

  public ngOnInit(): void {
    this.productItemService.cartAddedCount.asObservable().subscribe((itemCount: number) => {
      this.cartItemCount = itemCount;
    });
  }
}
