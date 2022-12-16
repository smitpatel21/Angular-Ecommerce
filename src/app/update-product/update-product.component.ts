import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  updateProductId: number=0;
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateProductId = Number(this.router.snapshot.paramMap.get('id'));
    this.getProduct(this.updateProductId);
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

  getProduct(id: number) {
    this.productService.getSingle(id).subscribe((result: any) => {
      this.productForm.setValue({
        name: result.name,
        price: result.price,
        imageUrl: result.imageUrl,
        description: result.description,
      });
    });
  }

  updateProduct() {
    this.productService.update(this.updateProductId,this.productForm.value).subscribe((result)=>{});
    this.productForm.reset();
  }
}
