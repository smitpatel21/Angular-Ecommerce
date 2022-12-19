import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  sellerId: number = 0;
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    let seller = localStorage.getItem('seller');
    this.sellerId = seller && JSON.parse(seller).id;
  }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get image() {
    return this.productForm.get('imageUrl');
  }

  addProduct() {
    this.productService.add({
      ...this.productForm.value,
      sellerId: this.sellerId,
    });
    this.productForm.reset();
  }
}
