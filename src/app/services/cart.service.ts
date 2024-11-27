import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  addItemToCart(product: any) {
    throw new Error('Method not implemented.');
  }
  private carrinho = new BehaviorSubject<any[]>([]);
  carrinho$ = this.carrinho.asObservable();

  adicionarAoCarrinho(produto: any): void {
    const carrinhoAtual = this.carrinho.getValue();
    this.carrinho.next([...carrinhoAtual, produto]);
  }

  limparCarrinho(): void {
    this.carrinho.next([]);
  }

  obterItensCarrinho(): any[] {
    return this.carrinho.getValue();
  }
}
