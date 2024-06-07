


export interface FindAllPattern
  extends Array<{
    titolo: string,
    descrizione?:string;
    contesto: string,
    esempio: string,
    stato: Stato,
    iso_92_4210:[
      Iso
    ],
    strategia:[
        Strategia
    ],
    vulerabilita: [
          Vulnerabilita
    ],
    principi_pbd: [
            PrincipioPbd
			],
    mvc:[
    Mvc
  ],
    articoli: [
    Articolo
  ],
    categoria_owasps:[
      CategoriaOwasps
    ]

}>
{}


export interface Pattern {
    id_pattern?:number
    titolo: string,
    descrizione?:string;
    contesto: string,
    esempio: string,
    stato: Stato,
    iso_92_4210:[
      Iso
    ],
    strategia:[
        Strategia
    ],
    vulerabilita: [
          Vulnerabilita
    ],
    principi_pbd: [
            PrincipioPbd
			],
    mvc:[
    Mvc
  ],
  articoli: [
    Articolo
  ],
  categoria_owasps:[
    CategoriaOwasps
  ]
}

export interface Strategia {
  id: number;
  id_strategia: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Iso {
  id: number;
  id_iso: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Vulnerabilita {
  id: number;
  id_vulnerabilita: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PrincipioPbd {
  id: number;
  id_principio: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Mvc {
  id: number;
  id_mvc: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CategoriaOwasps {
  id: number;
  id_owasp: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
export interface FindAllMvc {
  data: Mvcs[];
  meta: Meta;
}


export interface Mvcs {
  id: number;
  attributes: MvcAttributes;
}

export interface MvcAttributes {
  id_mvc: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
}


export interface FindAllPrincipi {
  data: Principis[];
}

export interface Principis {
  id: number;
  attributes: PrincipiAttributes;
}


export interface PrincipiAttributes {
  id_principio: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FindAllStrategia {
  data: Strategias[];
  meta: Meta;
}

export interface Strategias {
  id: number;
  attributes: StrategiasAttributes;
}

export interface StrategiasAttributes {
  id_strategia: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FindAllIso {
  data: Isos[];
}

export interface Isos {
  id: number;
  attributes: AttributesIsos;
}

export interface AttributesIsos {
  id_iso: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FindAllVulnerabilita {
  data: Vulnerabilitas[];
  meta: Meta;
}

export interface Vulnerabilitas {
  id: number;
  attributes: AttributeVulerabilitas;
}

export interface AttributeVulerabilitas {
  id_vulnerabilita: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FindAllCategoria {
  data: Categorias[];
  meta: Meta;
}

export interface Categorias {
  id: number;
  attributes: AttributeCategorias;
}

export interface AttributeCategorias {
  id_owasp: number;
  Descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FindAllArticle extends Array<Articolo> {}

export interface Articolo {
  id: number;
  id_articolo: number;
  descrizione: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  stato: Stato;
}

export interface Stato {
  id: number;
  id_stato: number;
  nome: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SearchMessage{
  nome: string;
  filtro: string;
}

