import { Routes } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { OrdersComponent } from "./orders/orders.component";

export const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "products", component: ProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "orders", component: OrdersComponent },
];
