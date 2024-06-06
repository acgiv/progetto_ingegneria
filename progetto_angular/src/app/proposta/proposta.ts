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

