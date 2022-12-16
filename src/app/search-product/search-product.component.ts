import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent implements OnInit {
  query: string | null = '';
  searchedProductList: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.paramMap.get('query');
    this.productService
      .searchProduct(this.query)
      .subscribe((result) => (this.searchedProductList = result));
  }
}
