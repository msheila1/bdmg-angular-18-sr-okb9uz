// src/app/components/checkout/checkout.component.ts
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {

  checkoutForm: FormGroup;
  //cartItems = this.cartService.getCart();

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.checkoutForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: ['']
    });
  }

  onSubmit() {
    const order: Order = {
      ...this.checkoutForm.value,
     // items: this.cartItems
    };
    this.orderService.addOrder(order);
    this.cartService.clearCart();
  }
}
