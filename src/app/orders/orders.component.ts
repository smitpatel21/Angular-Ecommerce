import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderData: any;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user)[0].id;
      this.productService.getOrders(userId).subscribe((result) => {
        if (result) {
          this.orderData = result;
        }
      });
    }
  }

  cancelOrder(id: number) {
    let orderData: any;
    this.productService.getOrder(id).subscribe((result) => {
      orderData = result;
      orderData.status = 'Cancel';
      this.productService.cancelOrder(orderData).subscribe((res) => {
        this.getOrders();
      });
    });
  }
}
