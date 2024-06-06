import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  constructor(private http: HttpClient) { }

   private apiUrl = 'http://localhost:1337/api';

    createArticle(body: any): Observable<any> {
       const headers = new HttpHeaders({'Content-Type': 'application/json'});
       return this.http.post<any>(this.apiUrl+'/articolos', body, {headers});
   }

   findAllPatternArticle(body: any): Observable<number[]> {
       const headers = new HttpHeaders({'Content-Type': 'application/json'});
       return this.http.post<any>(this.apiUrl+'/articolo/findIdPattern', body, {headers});
   }


   findIdAllPatternArticle(id: number): Observable<number[]> {
    return this.findAllPatternArticle({ idArticolo: id })
      .pipe(
        tap(response => {

        }),
        catchError(error => {
          console.error('Errore durante la registrazione:', error);
          return of([]);
        })
      );
  }

}
