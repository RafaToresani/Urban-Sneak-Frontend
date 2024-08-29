import { CommonModule } from '@angular/common';
import { ProductService} from '../product.service';
import { Product, ProductsResponse } from './../../../core/interfaces/product/productsResponse';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../core/services/search/search.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products!:ProductsResponse;

  constructor(private productService:ProductService, private searchService:SearchService){

  }

  ngOnInit(): void {
    this.searchService.searchParams$.subscribe({
      next: (params) => {
        console.log(params);
        this.productService.getProducts(params).subscribe(response => {
          this.products = response;
        });
      }
    });
  }

  
}
