import { createContext, useContext, useState } from "react";
import environment from "../environments/environment";

export const DataLayerContext = createContext();

export function DataAccessProvider({children}) {
    return <DataLayerContext.Provider value={{...environment}}>{children}</DataLayerContext.Provider>
}

export function useDataAccess() {
    const x = useContext(DataLayerContext)
    return {...x};
}