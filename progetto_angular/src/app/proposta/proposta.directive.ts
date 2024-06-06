import { Directive } from '@angular/core';
import {catchError, EMPTY, finalize, tap} from "rxjs";
import {
  FindAllCategoria,
  FindAllIso,
  FindAllMvc,
  FindAllPrincipi,
  FindAllStrategia,
  FindAllVulnerabilita
} from "../service/interface/search";
import {RicercaService} from "../service/ricerca.service";
import {CashService} from "../service/cash.service";
import {TextCompare} from "./proposta";

@Directive({
  selector: '[appProposta]',
  standalone: true
})
export class PropostaDirective {

  text_compare: TextCompare = {
    descrizione: '',
    contesto: '',
    esempio: '',
    strategia: '',
    mvc: '',
    articolo: '',
    principi: '',
    iso: '',
    vulnerabilita: '',
    categoria: ''
  };

  constructor(private ricercaService: RicercaService, protected cash: CashService) {
    this.popolationMenu();
  }

  popolationMenu() {
    this.loadMvc();
    this.loadPrincipi();
    this.loadStrategia();
    this.loadIso();
    this.loadVulnerabilita();
    this.loadCategoria();
  }

  loadMvc(): void {
    this.ricercaService.findManyMvc()
      .pipe(
        tap((data: FindAllMvc) => {
          for (const element of data.data) {
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


  loadPrincipi(): void {
    this.ricercaService.findManyPrincipi()
      .pipe(
        tap((data: FindAllPrincipi) => {
          for (const element of data.data) {
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
          for (const element of data.data) {
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
          for (const element of data.data) {
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

  loadVulnerabilita(): void {
    this.ricercaService.findManyVulnerabilita()
      .pipe(
        tap((data: FindAllVulnerabilita) => {
          for (const element of data.data) {
            this.cash.cacheVulnerabilita.push(element.attributes.Descrizione);
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

  loadCategoria(): void {
    this.ricercaService.findManyCategoria()
      .pipe(
        tap((data: FindAllCategoria) => {
          for (const element of data.data) {
            this.cash.cacheCategoria.push(element.attributes.Descrizione);
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

  cleanText(text: string): string {
    return text.replace(/\W+/g, '').toLowerCase();
  }

  isEqualDescription(items: string, tipo: string) {
    switch (tipo) {
      case "descrizione":
        return this.cleanText(items) == this.cleanText(this.text_compare.descrizione);
      case "contesto":
        return this.cleanText(items) == this.cleanText(this.text_compare.contesto);
      case "esempio":
        return this.cleanText(items) == this.cleanText(this.text_compare.esempio);
      case "mvc":
         return this.listsHaveSameElements(items.split(", "), this.text_compare.mvc.split(", "));
      case "article":
         return this.listsHaveSameElements(items.split(", "), this.text_compare.articolo.split(","));
      case "principi":
         return this.listsHaveSameElements(items.split(", "), this.text_compare.principi.split(", "));
       case "strategia":
         return this.listsHaveSameElements(items.split(", "), this.text_compare.strategia.split(", "));
      case "iso":
         return this.listsHaveSameElements(items.split(", "), this.text_compare.iso.split(", "));
      case "cwe":
        return this.listsHaveSameElements(items.split(", "), this.text_compare.vulnerabilita.split(", "));
      case "categoria":
        return this.listsHaveSameElements(items.split(", "), this.text_compare.categoria.split(", "));

        default:
        return false;
    }

  }

  listsHaveSameElements(list1: any[], list2: any[]): boolean {
    // Converte le liste in set
    const set1 = new Set(list1);
    const set2 = new Set(list2);

    // Controlla se i set contengono lo stesso numero di elementi
    if (set1.size !== set2.size) {
      return false;
    }

    // Controlla se entrambi i set contengono gli stessi elementi
    for (const item of set1) {
      if (!set2.has(item)) {
        return false;
      }
    }

    // Se i set sono uguali, le liste contengono gli stessi elementi
    return true;
  }


}
