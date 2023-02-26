import { createContext, useReducer } from "react";
import { INITIAL_STATE, langContextReducer } from "./langContextReducer";


export const LangContext = createContext(INITIAL_STATE);

export const LangContextProvider = ({children}) => {
    const [langs, dispatch] = useReducer(langContextReducer, INITIAL_STATE);
    return (
        <LangContext.Provider value={{langs, dispatch}}>
            {children}
        </LangContext.Provider>
    )
}