import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: any;
  cartItem: number = 0;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          const sellerData = localStorage.getItem('seller');
          this.sellerName = sellerData && JSON.parse(sellerData)[0]?.name;
        } else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          const userData = localStorage.getItem('user');
          this.userName = userData && JSON.parse(userData)[0]?.name;
        } else {
          this.menuType = 'default';
        }
      }
    });

    const localCart = localStorage.getItem('localCart');
    if (localCart) {
      this.cartItem = JSON.parse(localCart).length;
    }
    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user)[0].id;
      this.productService.getCartItems(userId);
    }
    this.productService.cartData.subscribe(
      (result) => (this.cartItem = result.length)
    );
  }

  logout(userType: string) {
    if (userType === 'seller') {
      localStorage.removeItem('seller');
    } else if (userType === 'user') {
      localStorage.removeItem('user');
    }
    this.router.navigate(['/']);
    this.productService.cartData.emit([]);
  }

  searchProduct(event: KeyboardEvent) {
    if (event) {
      const query = event.target as HTMLInputElement;
      if (query.value) {
        this.productService.searchProduct(query.value).subscribe((result) => {
          this.searchResult = result;
        });
      } else {
        this.hideSearch();
      }
    }
  }

  goToSearchResult(searchForm: any) {
    const query = searchForm.value.search;
    this.router.navigate([`search-product/${query}`]);
  }

  productDetail(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }

  hideSearch() {
    this.searchResult = [];
  }
}
