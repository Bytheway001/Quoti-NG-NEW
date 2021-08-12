import { compareData, ComparePlan, IQuote } from "./data";




export interface IQuoteContextType{
    quoteActions?:any,
    quote:IQuote|null,
    compare: ComparePlan[]
}