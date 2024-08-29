import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchParams } from '../../interfaces/searchParams';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchParamsSubject = new BehaviorSubject<SearchParams>({})
  constructor() { }

  searchParams$ = this.searchParamsSubject.asObservable();

  setSearchParams(params: SearchParams) {
    this.searchParamsSubject.next(params);
  }

  
}
