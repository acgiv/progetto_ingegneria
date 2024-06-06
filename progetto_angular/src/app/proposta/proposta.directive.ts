import { Directive } from '@angular/core';
import {catchError, EMPTY, finalize, tap} from "rxjs";
import {FindAllArticle, FindAllIso, FindAllMvc, FindAllPrincipi, FindAllStrategia} from "../service/interface/search";
import {RicercaService} from "../service/ricerca.service";
import {CashService} from "../service/cash.service";

@Directive({
  selector: '[appProposta]',
  standalone: true
})
export class PropostaDirective {
  fILDaLLarticoli: string[] = [];

  constructor(private ricercaService: RicercaService,  protected  cash: CashService) {
    this.loadMvc();
    this.loadArticoli();
    this.loadPrincipi();
    this.loadStrategia();
    this.loadIso();
  }

  loadMvc(): void {
    this.ricercaService.findManyMvc()
      .pipe(
        tap((data: FindAllMvc) => {
            for(const element of data.data) {
              this.cash.cacheMvc.push(element.attributes.Descrizione);
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

  loadArticoli(): void {
    this.ricercaService.findManyArticle()
      .pipe(
        tap((data: FindAllArticle) => {
          for (const element of data) {
            if (element) {
              if (element.stato.nome === "Validated") {
                this.fILDaLLarticoli.push("Article "+element.id_articolo);
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

   loadPrincipi(): void {
    this.ricercaService.findManyPrincipi()
      .pipe(
        tap((data: FindAllPrincipi) => {
            for(const element of data.data) {
              this.cash.cachePrincipi.push(element.attributes.Descrizione);
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

  loadStrategia(): void {
    this.ricercaService.findManyStrategia()
      .pipe(
        tap((data: FindAllStrategia) => {
            for(const element of data.data) {
              this.cash.cacheStrategia.push(element.attributes.Descrizione);
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

  loadIso(): void {
    this.ricercaService.findManyIso()
      .pipe(
        tap((data: FindAllIso) => {
            for(const element of data.data) {
              console.log(element);
              this.cash.cacheIso.push(element.attributes.Descrizione);
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

}
