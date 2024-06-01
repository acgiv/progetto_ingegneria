import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {urlValidator} from "../Validator/validator";
import {NgClass, NgIf} from "@angular/common";
import {AccessService} from "../service/access.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPeopleArrows, faUser, faUserCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    NgClass,
    RouterLink,
    NgIf,
    FaIconComponent
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
  selectedItem = "Pattern";

    ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLinks();
      }
    });
  }

    constructor(private router: Router, protected accessService: AccessService ) {
    this.isprofileOpen = false;
  }

      updateActiveLinks() {
        this.isHomeActive = this.isActive('/') ;
        this.isLoginActive = this.isActive('/login') ;
        this.isRegistrationActive = this.isActive('/registrati');
        this.isArticoloActive = this.isActive('/articolo');
        this.isPatternActive = this.isActive('/pattern');
      }

    isActive(route: string): boolean {
      return this.router.url === route;
    }

      isAmministratore(): boolean {
        return this.accessService.access.ruolo === "amministratore";
     }

       toggleNavbar() {
          this.isNavbarOpen = !this.isNavbarOpen;
        }


       filtraNavbar() {
          this.isfiltraOpen = !this.isfiltraOpen;
        }

      selectItem(item: string) {
          this.selectedItem = item;
          this.isfiltraOpen = false; // Close the dropdown after selection
        }

      toggleprofile(){
        this.isprofileOpen = !this.isprofileOpen;
      }

       exit() {
          this.accessService.resetAccess()
        }

  protected readonly faPeopleArrows = faPeopleArrows;
  protected readonly faUser = faUser;
  protected readonly faUserCircle = faUserCircle;
}
