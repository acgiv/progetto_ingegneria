import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CashService } from './cash.service';
import {FindAllArticle} from "./interface/search"; // Importa il servizio di cache

@Injectable({
  providedIn: 'root'
})
export class RicercaService {

  private apiUrl = 'http://localhost:1337/api/articolo';

  constructor(private http: HttpClient, private cashService: CashService) { }

  findManyArticle(): Observable<any> {
    return this.http.get<FindAllArticle>('http://localhost:1337/api/articolo/findAll');
  }
}
