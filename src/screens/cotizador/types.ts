export type IContext = {
  quote: IQuote | null;
  quoteActions: any;
  compare: ICompare[];
  loading: Boolean
};
export type IQuote={
  plans: IPlan[];
  params: any 
}

export type IPlan = {
  year: number;
  name: string;
  company: string;
  rates: IRate[];
  extra_params: any;
};
export type ICompare = {
  coverage: string;
  company: string;
  name: string;
  deductible: number;
  rate: IRate;
};
export type IRate = {
  deductible: number;
  deductible_out: number;
  main_price: IPrice;
  couple_price: IPrice|null;
  kids_price: IPrice|null;
  riders: IRider[];
};
export type IPrice = {
  [key:string]:number;
  yearly: number;
  biyearly: number;
};

export type IRider = {
  name:string,
  price:number,
  selected:boolean,
  available:boolean
}

export type IFormValues = {
  country: string;
  plan_type: number;
  main_age: number;
  couple_age?: number;
  num_kids?: number;
  kids_ages?: number[];
};
