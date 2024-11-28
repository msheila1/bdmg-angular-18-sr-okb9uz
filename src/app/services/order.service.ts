// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Order[] = [];
  private orderSubject = new BehaviorSubject<Order[]>(this.orders);

  getOrders() {
    return this.orderSubject.asObservable();
  }

  addOrder(order: Order) {
    this.orders.push(order);
    this.orderSubject.next(this.orders);
  }
}
