import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { shareReplay } from "rxjs";

const API_URL = "https://fakestoreapi.com/products";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductsList() {
    return this.http.get(`${API_URL}`);
  }
}
