
export interface ControlFormError{
  formControl: boolean;
  formSubmitted: boolean;
  error_clone_username: boolean;
  error_form_selected: boolean;
}

export interface RegisterBody{
  utenteData:{
     username: string;
     email: string;
     password: string;
     ruolo: string;
  }
    "specificData"?:{
     "nome": string,
     "partita_iva": string
    }
}

export interface RegisterRispost {
  error?: {
    number_error: number | undefined;
    message?: {
      [key: string]: string;
    }[];
  };
  "completed": boolean
}
