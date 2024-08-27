import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../../core/interfaces/product/productsResponse';
import { environment } from '../../core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private http:HttpClient) { }

  getProducts(params: {
    name?: string;
    brand?: string;
    category?: string;
    min?: number;
    max?: number;
    page?: number;
    size?: number;
    sort?: string;
    sortValue?: string;
  }): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${environment.apiUrl}${environment.version}/products`, { params });
  }

  
}
