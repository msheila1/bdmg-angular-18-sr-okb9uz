import { Component } from "@angular/core";
import { CartService } from "../shared/services/cart.service";
import { Observable } from "rxjs";
import { AsyncPipe, CurrencyPipe, JsonPipe } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { Product } from "../shared/models/product.model";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, MatListModule, MatButtonModule],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent {
  cart$: Observable<Product[]>;
  cartTotal$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$;
    this.cartTotal$ = this.cartService.cartTotal$;
  }

  deleteFromCart(item: Product) {
    this.cartService.removeFromCart(item);
  }

  cleanCart() {
    this.cartService.cleanCart();
  }
}
