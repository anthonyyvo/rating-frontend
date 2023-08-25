import { createContext, useReducer } from "react";
import { INITIAL_STATE, currentContextReducer } from "./currentContextReducer";


export const CurrentContext = createContext(INITIAL_STATE);

export const CurrentContextProvider = ({children}) => {
    const [current, dispatch] = useReducer(currentContextReducer, INITIAL_STATE);
    return (
        <CurrentContext.Provider value={{current, dispatch}}>
            {children}
        </CurrentContext.Provider>
    )
}