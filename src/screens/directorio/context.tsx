import Axios from "axios";
import React, { useContext, useState, useCallback } from "react";

import { useMemo } from "react";
import { APIURL } from "../../utils";
import { IContext, IFile } from "./types";

const InitialContext = {
  files: [],
  fileActions: null,
  filters: { company: 0, year: 0 },
};

export const FileContext = React.createContext<IContext>(InitialContext);

export const FileProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [filters, setFilters] = useState({ company: 0, year: 0 });
  const getFiles = async () => {
    const res = await Axios.get(APIURL + "/files");
    setFiles(res.data.data);
  };

  const applyFilter = useCallback(
    (filterName, filterValue) => {
      let f = { ...filters };
      switch (filterName) {
        case "company":
          f.company = filterValue;
          break;
        case "year":
          f.year = filterValue;
          break;
        default:
          break;
      }
      setFilters({ ...f });
    },
    [filters]
  );

  const fileActions = useMemo(
    () => ({
      getFiles,
      applyFilter,
    }),
    [applyFilter]
  );

  const value = {
    files,
    fileActions,
    filters,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export const useFiles = () => {
  const context = useContext(FileContext);
  return context;
};
