import {Component} from '@angular/core';
import {FormControl, FormsModule, NgForm, Validators} from "@angular/forms";
import {ViewPasswordService} from "../service/view-password.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {urlValidator} from "../Validator/validator";
import {NgIf} from "@angular/common";
import {sha256} from "js-sha256";
import {LoginService} from "./service/login.service";
import {catchError, of, tap} from "rxjs";
import {AccessService} from "../service/access.service";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    FaIconComponent,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: boolean;
  constructor(protected viewPasswordService: ViewPasswordService, private router: Router, private loginService: LoginService, private accessService:  AccessService) {
  this.error = true;
  }
  onLogin(form: NgForm){
     const username = form.value.username.toLowerCase();
      const password = sha256.update(form.value.password).hex();
       this.loginService.loginPost({ username, password })
        .pipe(
          tap(response => {
            if(!response.error) {
                this.error= true;
                this.accessService.insertAccess(response, username, true);
               this.router.navigate(['/']).then(() => {});
            }else{
               this.error= false;
            }
          }),
          catchError(error => {
            console.error('Errore durante la registrazione:', error);
            return of(null);
          })
        )
        .subscribe();
  }

    isAmminisrtatore(): boolean {
   const pattern = /\/amministratore/; // Definisci il pattern regolare
    return  new FormControl(this.router.url, [Validators.required, urlValidator(pattern)]).errors != null;
  }

}
