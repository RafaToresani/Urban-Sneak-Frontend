import { CommonModule } from '@angular/common';
import { ProductService} from '../product.service';
import { Product, ProductsResponse } from './../../../core/interfaces/product/productsResponse';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products!:ProductsResponse;

  constructor(private productService:ProductService){

  }

  ngOnInit(): void {
    const searchParams = {
      page: 0,
      size: 20
    };
    
    this.productService.getProducts(searchParams).subscribe({
      next: (response:ProductsResponse) => {
        this.products=response;
        console.log(this.products)
      }
    })
  }

  
}
