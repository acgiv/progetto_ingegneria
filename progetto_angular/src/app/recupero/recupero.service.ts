import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class RecuperoService {
  private apiUrl = 'http://localhost:1337/api';
  constructor(
    private http: HttpClient,

  ) { }

  SendisCheckEmail(body: any): Observable<any> {
   const headers = new HttpHeaders({'Content-Type': 'application/json'});
   return this.http.post<any>(this.apiUrl+'/utente/checkEmail', body, {headers});
   }


  isCheckEmail(newBody: { email: any }): Observable<any> {
   return  this. SendisCheckEmail(newBody)
      .pipe(
        tap( _ => {}),
        catchError(error => {
          console.error('Errore durante la registrazione:', error);
          return of(null);
        })
      )
   }


  SendChangePaasowrd(body: any, id: number): Observable<any> {
   const headers = new HttpHeaders({'Content-Type': 'application/json'});
   return this.http.put<any>(this.apiUrl+'/utentes/'+id, body, {headers});
   }


  ChangePassowrd(newBody: ChangePaasword): Observable<any> {
   return  this.SendChangePaasowrd(newBody, newBody.data.id)
      .pipe(
        tap( _ => {}),
        catchError(error => {
          console.error('Errore durante la registrazione:', error);
          return of(null);
        })
      )
   }
}


export interface RecuperoRespost{
     id: number,
    ruolo: string,
    error: boolean,
    email: string,
    username: string
  }

  export interface ChangePaasword{
    data:{
      id: number,
      email: string,
      username: string
      password: string,
    }

  }
