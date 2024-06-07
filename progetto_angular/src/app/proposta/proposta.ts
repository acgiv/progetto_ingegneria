export interface TextCompare {
    "descrizione": string;
    "contesto": string;
    "esempio": string;
    "strategia":string;
    "mvc":string;
    "articolo":string;
    "principi":string;
    "iso":string;
    "vulnerabilita":string;
    "categoria":string;
}

export interface CreateArticleBody{

  data: {
  id_articolo: number;
  descrizione: string,
  stato: number;
  design_patterns: number[];
     }
}

export interface CreatePatternBody{
  data: {
     id_pattern: number;
     titolo:string;
      contesto:string;
      descrizione: string;
      esempio: string;
      stato: number;
      iso_92_4210s: number[];
      principi_pbds: number[];
      strategias: number[];
      mvcs: number[];
      vulnerabilitas :number[];
      articolos: number[];
      categoria_owasps:number[];
  }
}

export interface ErrorMessageControl{
  notEdit: boolean;
  emptyMvc:boolean;
  emptyStrategy:boolean;
  emptyIso:boolean;
  emptyCategory:boolean;
  empyPrincipi:boolean;
  emptyArticoli:boolean;
  emptyVulnerabilita:boolean;
}
