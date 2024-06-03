


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
  ]

}>
{}


export interface Pattern {
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
  Categoria: string;
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
