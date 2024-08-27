import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchParams } from '../../interfaces/searchParams';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchParamsSubject = new BehaviorSubject<SearchParams>({
      name: '',
      brand: '',
      category: '',
      min: 0,
      max: 9999,
      page: 1,
      size: 10,
      sort: 'name',
  })
  constructor() { }

  searchParams$ = this.searchParamsSubject.asObservable();

  setSearchParams(params: SearchParams) {
    this.searchParamsSubject.next(params);
  }

  
}
