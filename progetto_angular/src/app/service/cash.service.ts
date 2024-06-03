import { Injectable } from '@angular/core';
import {Articolo, FindAllPattern, Pattern} from "./interface/search";

@Injectable({
  providedIn: 'root'
})
export class CashService {
   private cacheArticolo: Map<string, any> = new Map();
   private cachePattern:  Map<string, any> = new Map();
  constructor() { }

    setCachedResults(query: string, results: any, type:string): void {
      if (type === 'articolo') {
        this.cacheArticolo.set(query, results);
      }else{
        this.cachePattern.set(query,results);
      }
    }

   getCachedResults(query: string, type: string): any {
    if (type === 'articolo'){
        return this.cacheArticolo.get(query);
    }else{
        return this.cachePattern.get(query);
    }
  }
   getCachedResult(type: string): any {
    if (type === 'articolo'){
      return this.cacheArticolo;
    }else{
        return this.cachePattern;
    }
  }

  getCachedResultsPatterns(query: string): Pattern {
      return this.cachePattern.get(query);
  }

   getCachedResultsArticle(query: string): Articolo {
      return this.cacheArticolo.get(query);
  }

}
