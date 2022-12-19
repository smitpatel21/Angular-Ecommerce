import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  productData: any;
  productCount: number = 1;
  removeCart: boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(
      this.activeRoute.snapshot.paramMap.get('productId')
    );
    this.productService
      .getSingle(this.productId)
      .subscribe((result) => (this.productData = result));
    let cartData = localStorage.getItem('localCart');
    if (cartData && this.productId) {
      let cartItems = JSON.parse(cartData);
      let currentItem = cartItems.filter(
        (item: any) => item.id === this.productId
      );
      if (currentItem.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }

    const user = localStorage.getItem('user');
    if (user) {
      const userId = user && JSON.parse(user)[0].id;
      this.productService.getCartItems(userId);
      this.productService.cartData.subscribe((result) => {
        let cartItem = result.filter((item: any) => item.id === this.productId);
        if (cartItem.length) {
          this.removeCart = true;
        }
      });
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.count = this.productCount;
      if (localStorage.getItem('user')) {
        const user = localStorage.getItem('user');
        const userId = user && JSON.parse(user).id;
        let cartData = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        this.productService.addToCart(cartData).subscribe((result) => {
          this.productService.getCartItems(userId);
          this.removeCart = true;
        });
      } else {
        this.productService.addToLocalCart(this.productData);
        this.removeCart = true;
      }
    }
  }

  addProduct() {
    this.productCount += 1;
  }
  removeProduct() {
    this.productCount -= 1;
  }

  removeFromCart(id: number) {
    if (localStorage.getItem('user')) {
      this.productService.removeFromCart(id).subscribe((result) => {
        if (localStorage.getItem('user')) {
          const user = localStorage.getItem('user');
          const userId = user && JSON.parse(user).id;
          this.productService.getCartItems(userId);
        }
      });
    } else {
      this.productService.removeFromLocalCart(id);
    }
    this.removeCart = false;
  }
}
