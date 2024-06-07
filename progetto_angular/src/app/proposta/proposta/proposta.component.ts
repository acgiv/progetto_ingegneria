import {Component} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {AccessService} from "../../service/access.service";
import {RicercaService} from "../../service/ricerca.service";
import {CashService} from "../../service/cash.service";
import {catchError, EMPTY, finalize, tap} from "rxjs";
import {
  FindAllArticle,
  FindAllPattern,
  Pattern,
} from "../../service/interface/search";
import {PropostaDirective} from "../proposta.directive";
import {PropostaService} from "../proposta.service";
import {CreateArticleBody, CreatePatternBody} from "../proposta";



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
  clickableVulnerabilita: boolean = false;
  clickableCategoria: boolean = false;
  proposta_input: string = "";
  descrizione: unknown;
  contesto: string = "";
  esempi: any;
  fILDaLLarticoli: string[] = [];
  mvc: string[] = [];
  articoli: string[] = [];
  principi: string[] = [];
  strategia: string[] = [];
  iso: string[] = [];
  vulnerabilita: string[] = [];
  categoria: string[] = [];
  label_search: string;
  label: string = "";
  error: boolean = false;


  constructor(
    protected accessService: AccessService,
    protected cash: CashService,
    private ricercaService: RicercaService,
    protected propostaDirective: PropostaDirective,
    private propostaService: PropostaService,
  ) {
    this.loadArticoli();
    console.log(this.accessService.access.ruolo);
    if (this.accessService.access.ruolo === "azienda") {
      this.label_search = "articolo";
      this.label = "Articolo";
    } else {
      this.label_search = "pattern";
      this.loadPattern();
      this.label = "Pattern";
    }
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
    this.clickableStrategia = !this.clickableStrategia;
  }

  selectIso() {
    this.clickableIso = !this.clickableIso;
  }

  selectVulnerabilita() {
    this.clickableVulnerabilita = !this.clickableVulnerabilita;
  }

  selectCategoria() {
    this.clickableCategoria = !this.clickableCategoria;
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
                  this.setPopolatePattern(element);
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


  loadArticoli(): void {
    this.ricercaService.findManyArticle()
      .pipe(
        tap((data: FindAllArticle) => {
          let i = 0;
          for (const element of data) {
            if (element.stato.nome === "Validated") {
              this.fILDaLLarticoli.push("Article " + element.id_articolo);
               this.propostaDirective.cacheArticolId.set("Article " + element.id_articolo , element.id);

              if (this.label_search === "articolo") {
                this.cash.setCachedResults("Article " + element.id_articolo, element, this.label_search);

                if (i === 0) {
                  this.proposta_input = "Article " + element.id_articolo;
                  this.descrizione = element.descrizione;
                  if (element.descrizione != null) {
                    this.propostaDirective.text_compare.descrizione = element.descrizione;
                  }
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
      this.propostaDirective.text_compare.descrizione = this.cash.getCachedResultsArticle(item).descrizione
    } else {
      this.setPopolatePattern(this.cash.getCachedResultsPatterns(item));
    }
  }

  setPopolatePattern(patt: Pattern) {
    this.descrizione = patt.descrizione;
    this.contesto = patt.contesto;
    this.esempi = patt.esempio.replace("\n", "\n\n");
    this.set_element_mvc(patt);
    this.set_element_art(patt);
    this.set_element_principi(patt);
    this.set_element_strategia(patt);
    this.set_element_iso(patt);
    this.set_element_vulnerabilita(patt);
    this.set_element_categoria(patt);
    this.propostaDirective.text_compare.esempio = patt.esempio;
    this.propostaDirective.text_compare.contesto = patt.contesto;
    if (patt.descrizione != null) {
      this.propostaDirective.text_compare.descrizione = patt.descrizione;
    }
  }

  set_element_mvc(element: any) {
    this.mvc = [];
    for (const el of element.mvc) {
      this.mvc.push(el.Descrizione);
      this.propostaDirective.text_compare.mvc = this.mvc.join(", ");
    }
  }

  set_element_art(element: any) {
    this.articoli = [];
    for (const el of element.articoli) {
      this.articoli.push("Article " + el.id_articolo);
    }
    this.propostaDirective.text_compare.articolo = this.articoli.join(",");
  }

  set_element_principi(element: any) {
    this.principi = [];
    for (const el of element.principi_pbd) {
      this.principi.push(el.Descrizione);
    }
    this.propostaDirective.text_compare.principi = this.principi.join(", ");
  }

  set_element_strategia(element: any) {
    this.strategia = [];
    for (const el of element.strategia) {
      this.strategia.push(el.Descrizione);
    }
    this.propostaDirective.text_compare.strategia = this.strategia.join(", ");
  }

  set_element_iso(element: any) {
    this.iso = [];
    for (const el of element.iso_92_4210) {
      this.iso.push(el.Descrizione);
    }
    this.propostaDirective.text_compare.iso = this.iso.join(", ");
  }

  set_element_vulnerabilita(element: any) {
    this.vulnerabilita = [];
    for (const el of element.vulerabilita) {
      this.vulnerabilita.push(el.Descrizione);
    }
    this.propostaDirective.text_compare.vulnerabilita = this.vulnerabilita.join(", ");
  }

  set_element_categoria(element: any) {
    this.categoria = [];
    for (const el of element.categoria_owasps) {
      this.categoria.push(el.Descrizione);
    }
    this.propostaDirective.text_compare.categoria = this.categoria.join(", ");
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

  selectItemVulnerabilita(item: string) {
    this.selectItemMenu(item, this.vulnerabilita);
    this.clickableVulnerabilita = false;
  }

  selectItemCategoria(item: string) {
    this.selectItemMenu(item, this.categoria);
    this.clickableCategoria = false;
  }

  selectItemMenu(item: any, lista: any): void {
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


  newPorposta(form: NgForm) {
    let almenoUnoFalso = false;
    almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(form.value.descrizione, "descrizione");
    if(this.accessService.access.ruolo !== "Azienda"){
        almenoUnoFalso = this.isModificiatoPattern(almenoUnoFalso, form);
    }
    if (almenoUnoFalso) {
      this.error = false;
      if (this.accessService.access.ruolo === "Azienda"){
       this. sendRiquestIdPattern(form);
      }else{
        const cachedPattern = this.cash.getCachedResultsPatterns(this.proposta_input);
        if (cachedPattern !== undefined) {
        let body: CreatePatternBody = {
          data: {
            id_pattern: Number(cachedPattern.id_pattern),
            titolo: this.proposta_input,
            contesto: form.value.context,
            descrizione: form.value.descrizione,
            esempio: form.value.esempio,
            categoria_owasps: this.propostaDirective.get_list_id("categoria", this.categoria.join(", ")),
            mvcs: this.propostaDirective.get_list_id("mvc", this.mvc.join(", ")),
            stato: 2,
            strategias:  this.propostaDirective.get_list_id("strategia", this.strategia.join(", ")),
            articolos: this.propostaDirective.get_list_id("articoli", this.articoli.join(", ")),
            principi_pbds: this.propostaDirective.get_list_id("principi", this.principi.join(", ")),
            iso_92_4210s: this.propostaDirective.get_list_id("iso", this.iso.join(", ")),
            vulnerabilitas: this.propostaDirective.get_list_id("cwe", this.vulnerabilita.join(", "))
          }
        };
         this.propostaService.createPattern(body);
        }
      }

    } else {
      this.error = true;
    }
  }


 sendRiquestIdPattern(form: NgForm){
    this.propostaService.findIdAllPatternArticle(Number(this.proposta_input.replace("Article ", ""))).subscribe(ids => {
           const body: CreateArticleBody ={
            data: {
            id_articolo: Number(this.proposta_input.replace("Article ","")),
            descrizione: form.value.descrizione,
            stato: 2,
            design_patterns: ids
            }
          }
          this.propostaService.createArticle(body);
        });
    }
    isModificiatoPattern(almenoUnoFalso: boolean, form:NgForm){
      almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(form.value.context, "contesto");
      almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(form.value.esempio, "esempio");
      almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(this.mvc.join(", "), "mvc");
      almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(this.articoli.join(", "), "article");
      almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(this.strategia.join(", "), "strategia");
      almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(this.principi.join(", "), "principi");
      almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(this.iso.join(", "), "iso");
      almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(this.vulnerabilita.join(", "), "cwe");
      almenoUnoFalso = almenoUnoFalso || !this.propostaDirective.isEqualDescription(this.categoria.join(", "), "categoria");
      return almenoUnoFalso;
    }
}
