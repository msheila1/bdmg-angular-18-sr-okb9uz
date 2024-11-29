import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ZipcodeService {
  constructor(private http: HttpClient) {}

  getAddress(zipcode: string) {
    const API_URL = `https://viacep.com.br/ws/${zipcode}/json/`;
    return this.http.get(API_URL);
  }
}
