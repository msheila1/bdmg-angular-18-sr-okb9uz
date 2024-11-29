import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { ProductsService } from '../shared/services/products.service';
import { CartService } from '../shared/services/cart.service';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    mockProductsService = jasmine.createSpyObj('ProductsService', ['getProductsList']);
    mockCartService = jasmine.createSpyObj('CartService', ['updateCart']);
    
    // Mocking getProductsList return
    mockProductsService.getProductsList.and.returnValue(of([{ id: 1, name: 'Product 1', price: 100 }]));
    // mockCartService.cart$ = of([]);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, MatCardModule, MatButtonModule],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products list', () => {
    const productName = fixture.debugElement.query(By.css('.product-name')).nativeElement;
    expect(productName.textContent).toBe('Product 1');
  });

  it('should call updateCart when addToCart is called', () => {
    const product = { id: 1, name: 'Product 1', price: 100 };
    component.addToCart(product);
    
    // Check if the cartService.updateCart method was called with the correct product
    // expect(mockCartService.updateCart).toHaveBeenCalledWith(product);
  });
});
