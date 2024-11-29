import { AsyncPipe, JsonPipe } from "@angular/common";
import { Component } from "@angular/core";
import { OrdersService } from "../shared/services/orders.service";
import { Observable } from "rxjs";
import { Order } from "../shared/models/order.model";

@Component({
  selector: "app-orders",
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: "./orders.component.html",
  styleUrl: "./orders.component.scss",
})
export class OrdersComponent {
  order$: Observable<Order[]>;

  constructor(private orderService: OrdersService) {
    this.order$ = this.orderService.orders$;
  }
}
