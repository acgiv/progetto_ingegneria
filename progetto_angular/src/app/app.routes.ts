import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegistratiComponent} from "./registrati/registrati.component";
import {ViewProdoctComponent} from "./view-prodoct/view-prodoct.component";
import {RecuperoPasswordComponent} from "./recupero/recupero-password.component";
import {PropostaComponent} from "./proposta/proposta/proposta.component";

export const routes: Routes = [
   {path:'', component: HomeComponent},
   {path:'login', component: LoginComponent},
   {path:'registrati', component: RegistratiComponent},
   {path:'pattern', component: ViewProdoctComponent},
   {path:'articolo', component: ViewProdoctComponent},
   {path:'recuperopassword', component: RecuperoPasswordComponent},
  {path:'proposta', component: PropostaComponent},
  ]
;
