import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {AccessService} from "../service/access.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RicercaService} from "../service/ricerca.service";
import {FormsModule, NgForm} from "@angular/forms";
import {SearchMessage} from "../service/interface/search";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    NgClass,
    RouterLink,
    NgIf,
    FaIconComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit  {
  isHomeActive: boolean = false;
  isLoginActive: boolean = false;
  isPatternActive: boolean = false;
  isArticoloActive: boolean = false;
  isRegistrationActive: boolean = false;
  isNavbarOpen:boolean = false;
  isfiltraOpen:boolean = false;
  isprofileOpen:boolean = false;
  isPropostaActive:boolean = false;
  selectedItem = "Pattern";
  test_search : string = "Search Pattern";

    ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLinks();
      }
    });
  }

    constructor(private router: Router, protected accessService: AccessService, protected ricercaService: RicercaService) {
    this.isprofileOpen = false;
  }

      updateActiveLinks() {
        this.isHomeActive = this.isActive('/') ;
        this.isLoginActive = this.isActive('/login') ;
        this.isRegistrationActive = this.isActive('/registrati');
        this.isArticoloActive = this.isActive('/articolo');
        this.isPatternActive = this.isActive('/pattern');
        this.isPropostaActive =this.isActive('/proposta');

      }

    isActive(route: string): boolean {
      return this.router.url === route;
    }

      isAmministratore(): boolean {
        return this.accessService.getRuolo() === "amministratore";
     }

       toggleNavbar() {
          this.isNavbarOpen = !this.isNavbarOpen;
        }


       filtraNavbar() {
          this.isfiltraOpen = !this.isfiltraOpen;
        }

      selectItem(item: string) {
          this.selectedItem = item;
          this.setTextSearch();
          this.isfiltraOpen = false;
        }

      toggleprofile(){
        this.isprofileOpen = !this.isprofileOpen;
      }

       exit() {
          this.accessService.resetAccess()
        }

        sendSearch(s: NgForm){
          let message :SearchMessage = {
            nome : s.value.search,
            filtro : this.selectedItem
          };
          this.ricercaService.setMessageSearch(message);
        }

        setTextSearch(){
          if (this.selectedItem === "Articolo GDPR"){
            this.test_search = "Search Articolo";
          } else{
            this.test_search = "Search Pattern";
          }
        }


}
