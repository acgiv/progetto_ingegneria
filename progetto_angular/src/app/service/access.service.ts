import { Injectable } from '@angular/core';
import {Login} from "../login/login.login";

interface Access {
  access: boolean;
  username: string;
  email: string;
  ruolo: string;

}


@Injectable({
  providedIn: 'root'
})
export class AccessService {
  access: Access = {
    access: false,
    username: "",
    email: "",
    ruolo: "",
  }

  constructor() { }

   // Funzione per impostare lo stato di accesso
  setAccessStatus(status: boolean) {
    this.access.access = status;
  }

  // Funzione per impostare il nome utente
  setUsername(username: string) {
    this.access.username = username;
  }

  // Funzione per impostare l'email
  setEmail(email: string) {
    this.access.email = email;
  }

   setRuolo(ruolo: string ) {
    this.access.ruolo =  ruolo;
  }

  resetAccess() {
    this.access = {
      access: false,
      username: "",
      email: "",
      ruolo: ""
    };
  }

   insertAccess(response: Login, username: string, status: boolean){
    this.setAccessStatus(status);
    this.setUsername(username);
    this.setEmail(response.email);
    this.setRuolo(response.ruolo);
  }
}
