import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormControlDirective} from "../registrati/directive/form-control.directive";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {PasswordControlDirective} from "../registrati/directive/password-control.directive";
import {RegisterService} from "../registrati/service/register.service";
import {ViewPasswordService} from "../service/view-password.service";
import {ControlFormError} from "../registrati/registrati";
import {ChangePaasword, RecuperoRespost, RecuperoService} from "./recupero.service";
import {sha256} from "js-sha256";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-recupero-password',
  standalone: true,
  imports: [
    FaIconComponent,
    FormControlDirective,
    FormsModule,
    NgIf,
    PasswordControlDirective,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './recupero-password.component.html',
  styleUrl: './recupero-password.component.css'
})
export class RecuperoPasswordComponent {
  email: string = '';
  password: string = '';
  ceckEmail: boolean =false;
  control_error: ControlFormError;
  notTrovato:boolean =false;
  newBody: ChangePaasword ={
           data:{
             id : -1,
             email:"",
             username: "",
             password:""
           }
         }


  constructor( private router: Router, protected viewPasswordService: ViewPasswordService, protected registerService: RegisterService, private recuperoService:RecuperoService) {
      this.control_error = {
        'formControl': false,
        'formSubmitted': false,
        'error_clone_username': false,
        'error_form_selected': true
      };
  }

  onInputFocusEmail() {
    this.notTrovato = false;
  }

  async newRecupero(form_recupero: NgForm) {
    this.control_error['formControl'] = true;
    if (form_recupero.valid) {
      try {
        if (!this.notTrovato) {
          await this.checkEmail(form_recupero.value.email);
          this.notTrovato =true;
        } else {
          await this.changePassword(form_recupero.value.password);
          await this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async checkEmail(email: string) {
   const response: RecuperoRespost = await firstValueFrom(this.recuperoService.isCheckEmail({ email }));
    if (response.email) {
      this.ceckEmail = true;
      this.control_error['formControl'] = false;
      this.newBody.data.id = response.id;
      this.newBody.data.username = response.username;
      this.newBody.data.email = response.email;
    } else {
      this.notTrovato = true;
    }
  }

  async changePassword(password: string) {
    this.newBody.data.password = sha256.update(password).hex();
    await firstValueFrom(this.recuperoService.ChangePassowrd(this.newBody));
  }

}
