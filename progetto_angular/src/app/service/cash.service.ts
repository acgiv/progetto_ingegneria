import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CashService {
   private cache: Map<string, any> = new Map();
  constructor() { }

    setCachedResults(query: string, results: any): void {
    this.cache.set(query, results);
  }

   getCachedResults(query: string): any {
    return this.cache.get(query);
  }

   getCachedResult(): any {
    return this.cache;
  }

}
