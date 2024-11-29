import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Order } from "../models/order.model";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private _orders = new BehaviorSubject<Order[]>([]);

  get orders$() {
    return this._orders.asObservable();
  }
  constructor() {}

  placeOrder(order: Order) {
    let newOrdersList = this._orders.getValue();
    newOrdersList.push(order);

    this._orders.next(newOrdersList);
  }
}
