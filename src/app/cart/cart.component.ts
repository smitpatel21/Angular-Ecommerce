import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { summary } from 'src/data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartData: any;
  summary: summary = { amount: 0, tax: 0, promocode: 0, finalAmount: 0 };
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    const localCart = localStorage.getItem('localCart');
    if (localCart) {
      this.cartData = JSON.parse(localCart);
    } else {
      const user = localStorage.getItem('user');
      if (user) {
        const userId = JSON.parse(user)[0].id;
        this.productService.getCartItems(userId);
        this.calculateSummary();
      }
    }
  }

  calculateSummary() {
    this.productService.cartData.subscribe((result) => {
      this.cartData = result;
      this.summary = { amount: 0, tax: 0, promocode: 0, finalAmount: 0 };
      result.forEach((element: any) => {
        this.summary.amount += element.count * element.price;
        this.summary.tax += this.summary.amount * 0.1;
        this.summary.promocode = 50;
        this.summary.finalAmount +=
          this.summary.amount - this.summary.promocode + this.summary.tax;
      });
    });
  }

  removeFromCart(id: number) {
    if (localStorage.getItem('user')) {
      this.productService.removeFromCart(id).subscribe((result) => {
        if (result) {
          const user = localStorage.getItem('user');
          const userId = user && JSON.parse(user)[0].id;
          this.productService.getCartItems(userId);
          this.calculateSummary();
        }
      });
    } else {
      this.productService.removeFromLocalCart(id);
    }
  }

  goToCheckOut() {
    this.router.navigate(['/checkout']);
  }
}
