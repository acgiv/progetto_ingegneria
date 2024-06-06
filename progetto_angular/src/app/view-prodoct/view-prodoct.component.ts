import {Component, OnInit} from '@angular/core';
import {KeyValuePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Router} from "@angular/router";
import {CashService} from "../service/cash.service";
import {Articolo, Pattern, SearchMessage} from "../service/interface/search";
import {ViewDirective} from "./view_directive/view-directive.directive";
import {Nl2brPipe} from "./nl2br.pipe";
import {RicercaService} from "../service/ricerca.service";


@Component({
  selector: 'app-view-prodoct',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    NgIf,
    KeyValuePipe,
    NgForOf,
    Nl2brPipe
  ],
  templateUrl: './view-prodoct.component.html',
  styleUrl: './view-prodoct.component.css',
  providers: [
    ViewDirective
  ]
})
export class ViewProdoctComponent implements OnInit {
  openMenu: boolean;
  titoloMenu: string;


  constructor(protected router: Router, protected viewDirective: ViewDirective, protected ricercaService: RicercaService,  protected  cash: CashService) {
    this.openMenu = true;
    this.titoloMenu = this.viewDirective.set_menu_titile();

  }

  ngOnInit(): void {
        this.ricercaService.message$.subscribe(message => {
          this.viewText(message,'filtro');
       });
    }


  toggleNavMenu(){
    this.openMenu = !this.openMenu;
  }


  viewText(keys: unknown, type: string) {

         this.viewDirective.titolo = keys;
         let patt: Pattern | undefined ;
         switch(type){
           case "articolo":
                 if (typeof keys === 'string'){
                    this.viewDirective.titolo = keys;
                   this.viewDirective.descrizione = this.cash.getCachedResultsArticle(keys).descrizione;
                 }
             break;
           case "pattern":
             if (typeof keys === 'string') {
                this.viewDirective.titolo = keys;
               this.setPopolatePattern(this.cash.getCachedResultsPatterns(keys));
             }
           break;
           case "filtro":
              if (typeof keys === "object" && keys !== null) {
                const message: SearchMessage = keys as SearchMessage;
                this.viewDirective.resetParameters();
                  this.viewDirective.search(message).subscribe(message => {
                  if (this.isPattern(message)){
                     this.viewDirective.titolo = message.titolo;
                     this.setPopolatePattern(message);
                  }else if (this.isArticolo(message)){
                    this.viewDirective.titolo = "Article " + message.id_articolo;
                    this.viewDirective.descrizione = message.descrizione;
                  }
                });
              }
           break;
           default:
             break;

       }
  }

  setPopolatePattern(patt: Pattern){
       this.viewDirective.descrizione = patt.descrizione;
       this.viewDirective.contesto = patt.contesto;
       this.viewDirective.iso = patt.iso_92_4210;
       if(patt.esempio){
         this.viewDirective.esempi = patt.esempio.replace("\n", "<br> <br>");
       }
       this.viewDirective.strategia = patt.strategia;
       this.viewDirective.vulnerabilita = patt.vulerabilita;
       this.viewDirective.categoria = patt.categoria_owasps;
       this.viewDirective.principi = patt.principi_pbd;
       this.viewDirective.mvc = patt.mvc;
       this.viewDirective.articoli = patt.articoli;
  }
   isPattern(result: any): result is Pattern {
    return (result as Pattern).hasOwnProperty('id_pattern');
  }
  isArticolo(result: any): result is Articolo {
  return result && typeof result === 'object' && result.hasOwnProperty('id_articolo'); // replace with a property unique to Articolo
}
}

