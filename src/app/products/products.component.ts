import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ProductsService } from "../shared/services/products.service";
import { Observable } from "rxjs";
import { AsyncPipe, CurrencyPipe, JsonPipe } from "@angular/common";
import { CartService } from "../shared/services/cart.service";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, AsyncPipe, CurrencyPipe],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent implements OnInit {
  productsList$?: Observable<any>;
  cart$: Observable<any>;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit(): void {
    this.productsList$ = this.productsService.getProductsList();
  }

  addToCart(product: any) {
    this.cartService.updateCart(product);
  }
}
