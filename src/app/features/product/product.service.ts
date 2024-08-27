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
    let httpParams = new HttpParams();

    // Convert SearchParams to HttpParams
    Object.keys(params).forEach(key => {
      const value = params[key as keyof SearchParams];
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });
    return this.http.get<ProductsResponse>(`${environment.apiUrl}${environment.version}/products`, { params:httpParams });
  }

  
}
