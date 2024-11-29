import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of, reduce, tap } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private _cart = new BehaviorSubject<Product[]>([]);

  get cart$() {
    return this._cart.asObservable();
  }
  get cartTotal$() {
    let cart = this._cart.pipe(
      map((cart) => {
        let acc = cart.reduce((acc, product) => {
          return acc + product.cartAmount * product.price;
        }, 0);
        return Math.round(acc * 100) / 100;
      })
    );
    return cart;
  }

  constructor() {}

  updateCart(product: Product) {
    let newCart = this._cart.getValue();
    const index = newCart.findIndex((el) => el.id === product.id);

    if (index >= 0) {
      newCart[index].cartAmount += 1;
    } else {
      newCart.push({ ...product, cartAmount: 1 });
    }

    this._cart.next(newCart);
  }

  removeFromCart(product: Product) {
    let newCart = this._cart.getValue();
    const index = newCart.findIndex((el) => el.id === product.id);

    if (index >= 0) {
      newCart.splice(index, 1);
    }

    this._cart.next(newCart);
  }

  cleanCart() {
    this._cart.next([]);
  }
}
