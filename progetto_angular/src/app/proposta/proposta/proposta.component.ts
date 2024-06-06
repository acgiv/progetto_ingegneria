import {Component} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {AccessService} from "../../service/access.service";
import {RicercaService} from "../../service/ricerca.service";
import {CashService} from "../../service/cash.service";
import {catchError, EMPTY, finalize, tap} from "rxjs";
import {
  FindAllPattern,
  Iso,
  Pattern,
  Vulnerabilita
} from "../../service/interface/search";
import {PropostaDirective} from "../proposta.directive";

@Component({
  selector: 'app-proposta',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './proposta.component.html',
  styleUrl: './proposta.component.css'
})
export class PropostaComponent {
  clickable: boolean = false;
  clickableMvc: boolean = false;
  clickableArticle: boolean = false;
  clickablePrincipi: boolean = false;
  clickableStrategia: boolean = false;
  clickableIso: boolean = false;
  proposta_input: string = "";
  descrizione: unknown;
  contesto: string = "";
  esempi: any;
  mvc: string[] = [];
  articoli: string[] = [];
  principi: string[] = [];
  strategia:string[] = [];
  iso: string[] = [];
  vulnerabilita: Vulnerabilita[] | undefined;

  label_search: string;
  label: string = "";

  constructor(protected accessService: AccessService, protected cash: CashService, private ricercaService: RicercaService, protected propostaDirective: PropostaDirective) {
    accessService.setRuolo('Sviluppatore');
    if (this.accessService.access.ruolo === "Azienda") {
      this.label_search = "articolo";
      this.label = "Articoli";
    } else {
      this.label_search = "pattern";
      this.loadPattern();
      this.label = "Pattern";
    }
  }

  onProposta(f: NgForm) {
    console.log(f);
  }

  filtraArticolo() {
    this.clickable = !this.clickable;
  }

  selectMvc() {
    this.clickableMvc = !this.clickableMvc;
  }

  selectArticoli() {
    this.clickableArticle = !this.clickableArticle;
  }

   selectPrincipi() {
      this.clickablePrincipi = !this.clickablePrincipi;
    }

    selectStrategia() {
      this.clickableStrategia = !this.clickableStrategia ;
    }

     selectIso() {
     this.clickableIso = !this.clickableIso ;
      }


  loadPattern(): void {
    this.ricercaService.findManyPattern()
      .pipe(
        tap((data: FindAllPattern) => {
          let i = 0;
          for (const element of data) {
            if (element) {
              if (element.stato.nome === "Validated") {
                this.cash.setCachedResults(element.titolo, element, this.label_search);
                if (i === 0) {
                  this.proposta_input = element.titolo;
                  this.descrizione = element.descrizione;
                  this.contesto = element.contesto;
                  this.esempi = element.esempio.replace("\n", "\n\n");
                  this.vulnerabilita = element.vulerabilita;
                  this.set_element_strategia(element);
                  this.set_element_mvc(element);
                  this.set_element_art(element);
                  this.set_element_principi(element);
                  this.set_element_iso(element);
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

  selectItem(item: any) {
    this.proposta_input = item;
    this.clickable = false;
    if (this.accessService.access.ruolo === "Azienda") {
      this.descrizione = this.cash.getCachedResultsArticle(item).descrizione;
    } else {
      this.setPopolatePattern(this.cash.getCachedResultsPatterns(item));
    }
  }


  setPopolatePattern(patt: Pattern) {
    this.descrizione = patt.descrizione;
    this.contesto = patt.contesto;
    this.esempi = patt.esempio.replace("\n", "\n\n");
    this.vulnerabilita = patt.vulerabilita;
    this.set_element_mvc(patt);
    this.set_element_art(patt);
    this.set_element_principi(patt);
    this.set_element_strategia(patt);
    this.set_element_iso(patt) ;
  }

  set_element_mvc(element: any) {
    this.mvc = [];
    for (const el of element.mvc) {
      this.mvc.push(el.Descrizione);
    }
  }

  set_element_art(element: any) {
    this.articoli = [];
    for (const el of element.articoli) {
      this.articoli.push("Article " + el.id_articolo);
    }
  }

  set_element_principi(element: any) {
    this.principi = [];
    for (const el of element.principi_pbd) {
      this.principi.push(el.Descrizione);
    }
  }

  set_element_strategia(element: any) {
    this.strategia = [];
    for (const el of element.strategia) {
      this.strategia.push(el.Descrizione);
    }
  }

   set_element_iso(element: any) {
    this.iso= [];
    for (const el of element.iso_92_4210) {
      this.iso.push(el.Descrizione);
    }
  }



  selectItemMvc(item: any) {
    this.selectItemMenu(item, this.mvc);
    this.clickableMvc = false;
  }

  selectItemArticoli(item: any) {
    this.selectItemMenu(item, this.articoli);
    this.clickableArticle = false;
  }

   selectItemPrincipi(item: string) {
    this.selectItemMenu(item, this.principi);
    this.clickablePrincipi = false;
  }

   selectItemStrategia(item: string) {
      this.selectItemMenu(item, this.strategia);
     this.clickableStrategia = false;
  }

   selectItemIso(item: string) {
    this.selectItemMenu(item, this.iso);
    this.clickableIso = false;
  }

   selectItemMenu(item: any, lista: any):void {
     const itemIndex = lista.indexOf(item);
     if (itemIndex !== -1) {
       lista.splice(itemIndex, 1);
     } else {
       const dashIndex = lista.indexOf("-");
       if (dashIndex !== -1) {
         lista.splice(dashIndex, 1);
       }
       lista.push(item);
     }

     if (lista.length === 0) {
       lista.push("-");
     }
   }



}
