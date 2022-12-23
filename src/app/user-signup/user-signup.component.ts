import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  showLogin = false;

  ngOnInit(): void {
    this.userService.reloadUser();
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
    this.userService.signUp(signupData);
  }

  login() {
    this.userService.login(this.loginForm.value);
    this.userService.isLoginError.subscribe((error) => {
      if (error) {
      } else {
        this.localCartToDB();
      }
    });
  }

  localCartToDB() {
    let cartData = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    const userId = user && JSON.parse(user)[0].id;
    if (cartData) {
      let data = JSON.parse(cartData);
      data.forEach((item: any) => {
        let tempCart = {
          ...item,
          userId,
          productId: item.id,
        };
        delete item.id;
        this.productService.addToCart(tempCart).subscribe((result) => {});
      });
      localStorage.removeItem('localCart');
    }
    this.productService.getCartItems(userId);
  }
}
