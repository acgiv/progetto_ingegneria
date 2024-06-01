
export interface RegisterRispost {
  error?: {
    number_error: number | undefined;
    message?: {
      [key: string]: string;
    }[];
  };
  "completed": boolean
}
export interface FindAllArticle
  extends Array<{ [key: string]: [string, string, string] }>
{}
