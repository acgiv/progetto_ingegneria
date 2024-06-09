import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {ViewDirective} from "./view-prodoct/view_directive/view-directive.directive";
import {PropostaDirective} from "./proposta/proposta.directive";
import {RecuperoService} from "./recupero/recupero.service";

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), provideHttpClient(),  ViewDirective, PropostaDirective, RecuperoService ]
};
