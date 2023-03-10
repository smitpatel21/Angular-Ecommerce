import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: any;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    let seller = localStorage.getItem('seller');
    const sellerId = seller && JSON.parse(seller)[0].id;
    this.productService.getSellerProducts(sellerId).subscribe((result) => {
      this.productList = result;
    });
  }

  editProduct(id:number) {

  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe((result) => {
      this.getProducts();
    });
  }
}
