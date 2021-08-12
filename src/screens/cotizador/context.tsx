import Axios from "axios";
import React, { useContext, useState } from "react";
import { ContextDevTool } from "react-context-devtool";

import { APIURL } from "../../utils";
import {  ICompare, IContext, IFormValues, IPlan,IQuote } from "./types";

export const QuoteContext = React.createContext<IContext>({
  quote: null,
  quoteActions: null,
  compare: [],
  loading:false
});

QuoteContext.displayName = "Quote Context";

export const QuoteProvider: React.FC = ({ children }) => {
  const [quote,setQuote]=useState<IQuote|null>(null)
  const [compare,setCompare]=useState<ICompare[]>([]);
  const [loading,setLoading]=useState<Boolean>(false);

  /* Actions */
  const getQuote = (values: IFormValues) => {
    setLoading(true);

    Axios.post(APIURL + "/plans/quote", values)
      .then((res) => {
        setQuote(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setLoading(false)
      })
  };
  const addToCompare = (plan:IPlan,ded:number) => {
    if(compare.length>=4){
      alert("Solo puede seleccionar un maximo de 4 planes");
      return;
    }
    let rate = plan.rates.find(x=>x.deductible===ded);
    if(!rate){
      throw new Error("No rate was found") ;
    }
    let obj:ICompare={
      coverage:plan.extra_params.coverage,
      company:plan.company,
      name:plan.name,
      deductible:ded,
      rate:rate
    }
    let newCompare = [...compare,obj];
    setCompare(newCompare)
  }
  const removeFromCompare = (values: any) => {
    let newState = [...compare];
    newState = newState.filter((obj: any) => {
      return obj !== values;
    });
    setCompare(newState);
  };
  
  const selectRider = (plan: string, ded: number, name: string, value: number) => {
    if(quote){
      let newQuote:IQuote = Object.assign({},quote)
      if(!newQuote) throw new Error('No quote')
      let planobj = newQuote.plans.find(p=>p.name===plan)
      if(!planobj) throw new Error('No plan object')
      let rate = planobj.rates.find(p=>p.deductible===ded)
      if(!rate) throw new Error("No Rate Object");
      let rider = rate.riders.find(r=>r.name===name)
      if(!rider) throw new Error("No rider found")
      rider.selected=(value==1);
      setQuote(newQuote)

    }
   
  };
 
 const quoteActions = {
   getQuote,
   addToCompare,
   removeFromCompare,
   selectRider
 }
 const value = {
   quote,
   quoteActions,
   compare,
   loading
  
 }
 return (
  <QuoteContext.Provider value={value}>
    <ContextDevTool
      context={QuoteContext}
      id="QuoteContext"
      displayName="QuoteContext"
    />
    {children}
  </QuoteContext.Provider>
);
};


export const useQuote = () => {
  const context = useContext(QuoteContext);
  return context;
};
