import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  payableAmount: number = 0;
  cartData: any;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user).id;
      this.productService.getCartItems(userId);
      this.productService.cartData.subscribe((result) => {
        let amount = 0,
          tax = 0,
          promocode = 0;
        result.forEach((element: any, index: number) => {
          amount += element.count * element.price;
          tax += amount * 0.1;
          promocode += 50;
          this.payableAmount += amount - promocode + tax;
        });
        this.cartData = {
          status: 'Placed',
          cartPrice: this.payableAmount,
          items: result,
          userId,
        };
      });
    }
  }

  placeOrder() {
    this.productService.placeOrder(this.cartData).subscribe((result) => {
      if (result) {
        const user = localStorage.getItem('user');
        const userId = user && JSON.parse(user)[0].id;
        this.productService.getCartItems(userId);
        this.cartData.items.forEach((element: any) => {
          this.productService.removeFromCart(element.id).subscribe((res) => {
            if (res) this.productService.getCartItems(userId);
          });
        });
        this.router.navigate(['orders']);
      }
    });
  }

  checkOutForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    contact: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.checkOutForm.get('email');
  }

  get address() {
    return this.checkOutForm.get('address');
  }

  get contact() {
    return this.checkOutForm.get('contact');
  }
}
