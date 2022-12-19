import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.css'],
})
export class SellerSignupComponent implements OnInit {
  constructor(
    private sellerService: SellerService,
    private productService: ProductService
  ) {}

  showLogin = false;

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmpassword');
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

  signup() {
    const signupData = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };
    this.sellerService.signUp(signupData);
  }

  login() {
    this.sellerService.login(this.loginForm.value);
    this.sellerService.isLoginError.subscribe((error) => {
      if (error) {
      }
    });
  }

  localCartToDB() {
    let cartData = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    const userId = user && JSON.parse(user).id;
    if (cartData) {
      let data = JSON.parse(cartData);
      data.forEach((item: any) => {
        let tempCart = {
          ...item,
          userId,
          productId: item.id,
        };
        delete item.id;
        this.productService.addToCart(tempCart);
      });
      localStorage.removeItem('localCart');
    }
    this.productService.getCartItems(userId);
  }
}
