import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../../core/interfaces/product/productsResponse';
import { environment } from '../../core/environments/environment';
import { SearchParams } from '../../core/interfaces/searchParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private http:HttpClient) { }

  getProducts(params:SearchParams): Observable<ProductsResponse> {
    const httpParam = this.buildHttpParams(params);

    return this.http.get<ProductsResponse>(`${environment.apiUrl}${environment.version}/products`, { params:httpParam });
  }


  private buildHttpParams(params: SearchParams): HttpParams {
    let httpParams = new HttpParams();

    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }
    if (params.brand) {
      httpParams = httpParams.set('brand', params.brand);
    }
    if (params.category) {
      httpParams = httpParams.set('category', params.category);
    }
    if (params.min !== undefined) {
      httpParams = httpParams.set('min', params.min.toString());
    }
    if (params.max !== undefined) {
      httpParams = httpParams.set('max', params.max.toString());
    }
    if (params.page !== undefined) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params.size !== undefined) {
      httpParams = httpParams.set('size', params.size.toString());
    }
    if (params.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }

    return httpParams;
  }
  
}
