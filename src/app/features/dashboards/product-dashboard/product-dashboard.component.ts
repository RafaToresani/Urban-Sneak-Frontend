import { Component } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { ProductsResponse } from '../../../core/interfaces/product/productsResponse';
import { SearchService } from '../../../core/services/search/search.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchParams } from '../../../core/interfaces/searchParams';

@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent {

  products!:ProductsResponse;
  searchForm!:FormGroup;
  
  constructor(private productService:ProductService, private searchService:SearchService, private fb:FormBuilder){

  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: ['', Validators.required]
    })
    this.searchService.resetSearchParams();
    this.getProducts();
  }

  getProducts(){
    this.searchService.searchParams$.subscribe({
      next: (params) => {
        console.log(params);
        params.size=50;
        this.productService.getProducts(params).subscribe(response => {
          this.products = response;
        });
      }
    });
  }

  onSearch(){
    const params:SearchParams = {
      name:this.searchForm.controls['query'].value
    }
    this.searchService.setSearchParams(params);
    this.getProducts();
  }
}
