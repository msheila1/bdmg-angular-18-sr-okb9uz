import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { CartService } from "../shared/services/cart.service";
import {

  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  switchMap,
} from "rxjs";
import { Product } from "../shared/models/product.model";
import { AsyncPipe, CurrencyPipe, JsonPipe } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ZipcodeService } from "../shared/services/zipcode.service";
import { OrdersService } from "../shared/services/orders.service";
import { UserInfo } from "../shared/models/user-info.model";
import { Order } from "../shared/models/order.model";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Product[]>;
  cartTotal$: Observable<number>;
  destroyRef = inject(DestroyRef);
  lastCartItems!: Product[];

  private formBuilder = inject(FormBuilder);

  constructor(
    private cartService: CartService,
    private zipcodeService: ZipcodeService,
    private orderService: OrdersService
  ) {
    this.cart$ = this.cartService.cart$;
    this.cartTotal$ = this.cartService.cartTotal$;
  }

  ngOnInit(): void {
    this.requestZipCode();
    this.getCart();
  }

  checkoutForm = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: [""],
    email: [""],
    phone: [""],
    address: this.formBuilder.group({
      street: [""],
      city: [""],
      state: [""],
      zip: ["", Validators.required],
    }),
  });

  onSubmit() {
    this.checkoutForm.reset();
    this.cartService.cleanCart();
  }

  requestZipCode() {
    this.checkoutForm
      .get("address.zip")
      ?.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter((val) => {
          return val?.length === 8;
        }),
        switchMap((value) => {
          return this.zipcodeService.getAddress(value ?? "");
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data: any) => {
        if (!data.erro) {
          this.checkoutForm
            .get("address.street")
            ?.setValue(data.logradouro ?? "");
          this.checkoutForm
            .get("address.city")
            ?.setValue(data.localidade ?? "");
          this.checkoutForm.get("address.state")?.setValue(data.estado ?? "");
        } else {
          this.checkoutForm.get("address")?.reset();
          console.error(data.error);
        }
      });
  }

  getCart() {
    this.cart$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cart) => (this.lastCartItems = cart));
  }
}
