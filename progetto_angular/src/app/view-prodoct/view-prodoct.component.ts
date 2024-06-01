import {Component} from '@angular/core';
import {KeyValuePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Router} from "@angular/router";
import {CashService} from "../service/cash.service";
import {RicercaService} from "../service/ricerca.service";
import {catchError, EMPTY, finalize, tap} from "rxjs";
import {FindAllArticle} from "../service/interface/search";


@Component({
  selector: 'app-view-prodoct',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    NgIf,
    KeyValuePipe,
    NgForOf
  ],
  templateUrl: './view-prodoct.component.html',
  styleUrl: './view-prodoct.component.css'
})
export class ViewProdoctComponent {
  openMenu : boolean ;
  titoloMenu: string;
  titolo: unknown;
  descrizione: unknown;
  constructor(private router: Router,  protected  cash: CashService, private ricercaService: RicercaService ) {
    this.openMenu = true;
    this.loadArticoli();
    if (this.router.url === "/articolo"){

       this.titoloMenu = "Articolo";
    }else{
      this.titoloMenu = "Pattern";
    }

  }

  toggleNavMenu(){
    this.openMenu = !this.openMenu;
  }


  loadArticoli(): void {
    this.ricercaService.findManyArticle()
      .pipe(
        tap((data: FindAllArticle[]) => {
          let i =0;
          for(const element of data) {
            const entry = element;
            let key: any = Object.keys(entry)[0]; // Ottieni la chiave dall'oggetto
            if(key){
            const values = entry[key]; // Ottieni i valori associati alla chiave
            this.cash.setCachedResults(key, values);
            if (i===0){
              this.titolo = key;
              this.descrizione = values[1];
              i+=1;
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

  viewText(keys: unknown) {
    if (typeof keys === 'string') { // Verifica se key è una stringa
      this.titolo = keys;
      this.descrizione = this.cash.getCachedResults(keys)[1];
    }
  }
}

