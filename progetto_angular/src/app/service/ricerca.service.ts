import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {
  FindAllArticle, FindAllCategoria, FindAllIso,
  FindAllPattern,
  FindAllPrincipi,
  FindAllStrategia, FindAllVulnerabilita,
  SearchMessage
} from "./interface/search";

@Injectable({
  providedIn: 'root'
})
export class RicercaService {

  private apiUrl = 'http://localhost:1337/api';
  private list_pattern = [
    "Pattern",
    "Articolo GDPR",
     "Mvc",
    "Principi",
    "Vulnerabilità",
    "ISO 92-4210",
    "Strategia"
  ]

  private messageSubject = new Subject<SearchMessage>();
  message$ = this.messageSubject.asObservable();

  constructor(private http: HttpClient) { }

  findManyArticle(): Observable<any> {
    return this.http.get<FindAllArticle>(this.apiUrl+'/articolo/findAll');
  }

   findManyPattern(): Observable<any> {
    return this.http.get<FindAllPattern>(this.apiUrl+'/pattern/findAll');
  }

   findManyMvc(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/mvcs');
  }

  findManyPrincipi(): Observable<any> {
    return this.http.get<FindAllPrincipi>(this.apiUrl+'/principis');
  }

   findManyStrategia(): Observable<any> {
    return this.http.get<FindAllStrategia>(this.apiUrl+'/strategias');
  }

   findManyIso(): Observable<any> {
    return this.http.get<FindAllIso>(this.apiUrl+'/iso-92-4210s');
  }

   findManyVulnerabilita(): Observable<any> {
    return this.http.get<FindAllVulnerabilita>(this.apiUrl+'/vulnerabilitas');
  }

  findManyCategoria(): Observable<any> {
   return this.http.get<FindAllCategoria>(this.apiUrl+'/categoria-owasps');
  }

  search(body: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.apiUrl+'/pattern/ricerca', body, {headers});
  }

  getListPattern(){
    return this.list_pattern;
  }

  setMessageSearch( message: SearchMessage){
     this.messageSubject.next(message);
  }



}
