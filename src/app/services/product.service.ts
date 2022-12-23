import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  cartData = new EventEmitter();

  add(data: any) {
    this.http
      .post('http://localhost:3000/products', data, { observe: 'response' })
      .subscribe((result) => {});
  }

  get() {
    return this.http.get('http://localhost:3000/products');
  }

  getSellerProducts(id:number) {
    return this.http.get(`http://localhost:3000/products?sellerId=${id}`);
  }

  getSingle(id: number) {
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  update(id: number, data: any) {
    return this.http.put(`http://localhost:3000/products/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  searchProduct(query: string | null) {
    return this.http.get(`http://localhost:3000/products?q=${query}`);
  }

  addToCart(data: any) {
    return this.http.post('http://localhost:3000/cart', data);
  }

  addToLocalCart(data: any) {
    let cartData: any[] = [];
    const localCart = localStorage.getItem('localCart');
    if (localCart) {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      this.cartData.emit(cartData);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    } else {
      this.cartData.emit([data]);
      localStorage.setItem('localCart', JSON.stringify([data]));
    }
  }

  removeFromCart(id: number) {
    this.removeFromLocalCart(id);
    return this.http.delete(`http://localhost:3000/cart/${id}`);
  }

  removeFromLocalCart(id: number) {
    let localCart = localStorage.getItem('localCart');
    if (localCart) {
      let cartItems = localCart && JSON.parse(localCart);
      cartItems = cartItems.filter((item: any) => item.id !== id);
      localStorage.setItem('localCart', JSON.stringify(cartItems));
      this.cartData.emit(cartItems);
    }
    if (localCart === '[]') localStorage.removeItem('localCart');
  }

  getCartItems(userId: number) {
    return this.http
      .get(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  getOrders(userId: number) {
    return this.http.get(`http://localhost:3000/orders?userId=${userId}`);
  }

  placeOrder(data: any) {
    return this.http.post(`http://localhost:3000/orders`, data);
  }

  getOrder(id: number) {
    return this.http.get(`http://localhost:3000/orders/${id}`);
  }

  cancelOrder(data: any) {
    return this.http.put(`http://localhost:3000/orders/${data.id}`, data);
  }
}
