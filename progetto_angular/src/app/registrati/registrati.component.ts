import {Component, Injectable, ViewChild} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf, } from "@angular/common";
import {ViewPasswordService} from "../service/view-password.service";
import {RegisterService} from "./service/register.service";
import {FormControlDirective} from "./directive/form-control.directive";
import {PasswordControlDirective} from "./directive/password-control.directive";
import {ControlFormError, RegisterBody} from "./registrati";
import {sha256} from "js-sha256";
import {catchError, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {AccessService} from "../service/access.service";


@Component({
  selector: 'app-registrati',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    FormControlDirective,
    NgClass,
    PasswordControlDirective
  ],
  templateUrl: './registrati.component.html',
  styleUrl: './registrati.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class RegistratiComponent {
  @ViewChild('form_register', { static: true }) registerForm!: NgForm;
  @ViewChild('aziendaForm', { static: true }) aziendaForm!: NgForm;
  email: string = '';
  username: string = '';
  password: string = '';
  clickable: boolean = false;
  rule_input: string = "Filtra Ruolo";
  control_error: ControlFormError;
  nomeazienda: string ='';
  ptiva: string ='';


  constructor(
    protected viewPasswordService: ViewPasswordService,
    protected registerService: RegisterService,
    private router: Router,
    private accessService:  AccessService


  ) {
    this.control_error = {
      'formControl': false,
      'formSubmitted': false,
      'error_clone_username': false,
      'error_form_selected': true
    };
  }

  onRegister(newBody: RegisterBody, form: NgForm) {
    this.registerService.registerPost(newBody)
      .pipe(
        tap(response => {
          this.registerService.set_error_clone_register_reset();
          if (response.completed) {
             this.accessService.insertAccess(response,form.value.username, true);
             this.router.navigate(['/']).then(() => {});
          } else {
            for (let i = 0; i < response.error.number_error; i++) {
              let keys = Object.keys(response.error.message[i])[0];
              this.registerService.set_control_register(true, Object.keys(response.error.message[i])[0]);
              this.registerService.set_message_register(response.error.message[i][keys], keys);
              this.registerService.set_error_clone_register(true, keys);
            }
          }
        }),
        catchError(error => {
          console.error('Errore durante la registrazione:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  newRegister(form: NgForm) {
    this.control_error['formControl'] = true;
    this.control_error['error_form_selected'] = this.registerService.control_error_message_rule(this.rule_input);
    if (form.valid && !this.control_error['error_form_selected']) {
      let newBody: RegisterBody = {
        utenteData: {
          username: form.value.username.toLowerCase(),
          email: form.value.email.toLowerCase(),
          password: sha256.update(form.value.password).hex(),
          ruolo: this.rule_input.toLowerCase()
        }
      };
      if (this.rule_input === "Azienda") {
        newBody.specificData = {
          nome: form.value.nomeazienda,
          partita_iva: form.value.ptiva
        };
        this.onRegister(newBody, form);
      }
      this.onRegister(newBody, form);

    }
  }

  filtraRuolo() {
    this.clickable = !this.clickable;
  }

  selectItem(item: string) {
    this.rule_input = item;
    this.control_error['error_form_selected'] = this.registerService.control_error_message_rule(item);
    this.clickable = false;
  }
    onInputFocusEmail() {
    this.registerService.value_error_clone_email = false;
  }
  onInputFocusUsername() {
    this.registerService.value_error_clone_username = false;
  }
}
