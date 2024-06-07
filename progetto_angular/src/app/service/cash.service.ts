import { Injectable } from '@angular/core';
import {Articolo, Pattern} from "./interface/search";

@Injectable({
  providedIn: 'root'
})
export class CashService {
   private cacheArticolo: Map<string, any> = new Map();
   private cachePattern:  Map<string, any> = new Map();
   public  cacheMvc: string[] = [];
   public  cachePrincipi: string[] = [];
   public  cacheStrategia: string[] = [];
   public  cacheIso: string[] = [];
   public  cacheVulnerabilita: string[] = [];
   public  cacheCategoria: string[] = [];
   public cacheMvcId: Map<string, number> = new Map();
   public cachePrincipiId:  Map<string, number> = new Map();
   public cacheStrategiaId:   Map<string, number> = new Map();
   public cacheIsoId:   Map<string, number> = new Map();
   public cacheVulnerabilitaId:   Map<string, number> = new Map();
   public cacheCategoriaId:   Map<string, number> = new Map();
  constructor() { }

    setCachedResults(query: string, results: any, type:string): void {
      if (type === 'articolo') {
        this.cacheArticolo.set(query, results);
      }else{
        this.cachePattern.set(query,results);
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
