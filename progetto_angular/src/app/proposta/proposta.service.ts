import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CreateArticleBody, CreatePatternBody} from "./proposta";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

   private apiUrl = 'http://localhost:1337/api';

    SendcreateArticle(body: any): Observable<any> {
       const headers = new HttpHeaders({'Content-Type': 'application/json'});
       return this.http.post<any>(this.apiUrl+'/articolos', body, {headers});
   }

   findAllPatternArticle(body: any): Observable<number[]> {
       const headers = new HttpHeaders({'Content-Type': 'application/json'});
       return this.http.post<any>(this.apiUrl+'/articolo/findIdPattern', body, {headers});
   }

    sendcreatePattern(body: any): Observable<any> {
       const headers = new HttpHeaders({'Content-Type': 'application/json'});
       return this.http.post<any>("http://localhost:1337/api/design-patterns", body, {headers});
   }

   findIdAllPatternArticle(id: number): Observable<number[]> {
    return this.findAllPatternArticle({ idArticolo: id })
      .pipe(
        tap(_ => {}),
        catchError(error => {
          console.error('Errore durante la registrazione:', error);
          return of([]);
        })
      );
  }

    createArticle(newBody: CreateArticleBody) {
    this.SendcreateArticle(newBody)
      .pipe(
        tap(_ => {
           this.router.navigate(['/']).then(success => {
            if (!success) {
              console.error('Navigazione fallita');
            }
          });
        }),
        catchError(error => {
          console.error('Errore durante la registrazione:', error);
          return of(null);
        })
      )
      .subscribe();
  }

     createPattern(newBody: CreatePatternBody) {
    this.sendcreatePattern(newBody)
      .pipe(
        tap(_ => {
           this.router.navigate(['/']).then(success => {
            if (!success) {
              console.error('Navigazione fallita');
            }
          });
        }),
        catchError(error => {
          console.error('Errore durante la registrazione:', error);
          return of(null);
        })
      )
      .subscribe();
  }

}
