import { Directive } from '@angular/core';
import {catchError, EMPTY, finalize, map, Observable, tap} from "rxjs";
import {
  Articolo,
  FindAllArticle,
  FindAllPattern,
  Iso, Mvc, Pattern,
  PrincipioPbd, SearchMessage,
  Strategia,
  Vulnerabilita
} from "../../service/interface/search";
import {RicercaService} from "../../service/ricerca.service";
import {CashService} from "../../service/cash.service";
import {Router} from "@angular/router";

@Directive({
  selector: '[appViewDirective]',
  standalone: true
})

export class ViewDirective {
  titolo: unknown;
  descrizione: unknown;
  contesto: string= "";
  esempi: any;
  mvc : Mvc[] | undefined;
  articoli: Articolo[] | undefined;
  strategia :  Strategia[] | undefined;
  iso : Iso[] | undefined;
  vulnerabilita : Vulnerabilita[] |undefined;
  principi : PrincipioPbd[] |undefined;
  root:string ;
  constructor(protected router: Router, private ricercaService: RicercaService,  protected  cash: CashService) {
     this.root =String(this.router.url).replace('/','');
  }

   loadArticoli(): void {
    this.ricercaService.findManyArticle()
      .pipe(
        tap((data: FindAllArticle) => {
          let i =0;
          for(const element of data) {
           if(element) {
             if(element.stato.nome ==="Validated"){
               this.cash.setCachedResults("Article "+element.id_articolo, element, this.root);
                if (i==0) {
                  this.titolo = "Article "+element.id_articolo;
                  this.descrizione = element.descrizione;
                }
                i += 1;
             }
            }
          }
        }),
        catchError(error => {
          console.error('Errore durante il recupero degli articoli:', error);
          return EMPTY; // Ritorna un observable vuoto per continuare il flusso
        }), finalize(() => {

        })
      )
      .subscribe();
  }

    loadPattern(): void {

    this.ricercaService.findManyPattern()
      .pipe(
        tap((data:  FindAllPattern) => {
          let i =0;
          for(const element of data) {
            if(element){
              if(element.stato.nome ==="Validated") {
                this.cash.setCachedResults(element.titolo, element, this.root);
                if (i === 0) {
                  this.titolo = element.titolo;
                  this.descrizione = element.descrizione;
                  this.contesto = element.contesto;
                  this.iso = element.iso_92_4210;
                  this.esempi = element.esempio.replace("\n", "<br> <br>");
                  this.strategia = element.strategia;
                  this.vulnerabilita = element.vulerabilita;
                  this.principi = element.principi_pbd;
                  this.mvc = element.mvc;
                  this.articoli = element.articoli;
                  i += 1;
                }
              }
            }
          }

        }),
        catchError(error => {
          console.error('Errore durante il recupero degli articoli:', error);
          return EMPTY; // Ritorna un observable vuoto per continuare il flusso
        }), finalize(() => {

        })
      )
      .subscribe();
  }

search(message: SearchMessage): Observable<Pattern | Articolo> {
  if (message.filtro === "Pattern") {
    return this.ricercaService.search(message).pipe(
      tap(() => {}),
      catchError(error => {
        console.error('Errore Non è stato trovato alcun articolo', error);
        return EMPTY; // Return an empty observable to continue the stream
      }),
      map((element: Pattern) => element),
      finalize(() => {
        // Add your finalize logic here
      })
    );
  } else {
    message.nome = message.nome.replace("Article ", "");
    return this.ricercaService.search(message).pipe(
      tap(() => {}),
      catchError(error => {
        console.error('Errore Non è stato trovato alcun articolo', error);
        return EMPTY; // Return an empty observable to continue the stream
      }),
      map((element: Articolo) => element), // Correct the type here
      finalize(() => {
        // Add your finalize logic here
      })
    );
  }
}

  set_menu_titile(){
    if (this.root  === "articolo"){
      this.loadArticoli();
       return this.capitalizeFirstLetter(this.root);
    }else{
      this.loadPattern();
      return  this.capitalizeFirstLetter(this.root);

    }
  }

   capitalizeFirstLetter(string:string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  resetParameters(){
      this.titolo = "";
      this.descrizione = "";
      this.contesto = "";
      this.iso = undefined;
      this.esempi = "";
      this.strategia = undefined;
      this.vulnerabilita = undefined;
      this.principi = undefined;
      this.mvc = undefined;
      this.articoli = undefined;
  }

}
