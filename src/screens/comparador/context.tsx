import Axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { ContextDevTool } from "react-context-devtool";
import { APIURL } from "../../utils";
import { IContext } from "./types";

const initialContext = {
  planNames: [],
  compareActions: null,
  comparativo: null,
  loading: false,
};

export const CompareContext = React.createContext<IContext>(initialContext);

export const CompareProvider: React.FC = ({ children }) => {
  const [planNames, setPlanNames] = useState<string[]>([]);
  const [comparativo, setComparativo] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);
  const getPlanNames = () => {
 
    Axios.get(APIURL + "/plans/getNames")
      .then((res) => {
        setPlanNames(res.data.data);
      })
      .catch((err) => {
        console.log("No se pudieron cargar los planes", err);
      })
      
  };

  const getCompare = async (plans: string[]) => {
    setLoading(true);
    const res = await Axios.post(APIURL + "/plans/compare", plans);
    setComparativo(res.data.data);
    setLoading(false);
  };

  const compareActions = useMemo(
    () => ({
      getCompare: (plans: string[]) => getCompare(plans),
      getPlanNames: () => getPlanNames(),
    }),
    []
  );
  const value = { planNames, compareActions, comparativo, loading };

  return (
    <CompareContext.Provider value={value}>
      <ContextDevTool
        context={CompareContext}
        id="CompareContext"
        displayName="CompareContext"
      />
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  return context;
};
