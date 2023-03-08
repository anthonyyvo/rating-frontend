import { createContext, useReducer } from "react";
import {dataContextReducer, INITIAL_STATE} from './dataContextReducer';



export const DataContext = createContext(INITIAL_STATE);
export const DataContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(dataContextReducer, INITIAL_STATE);
    return (
        <DataContext.Provider value={{state, dispatch}}>
            {/* <DataDispatchContext.Provider value={dispatch}> */}
            {children}
            {/* </DataDispatchContext.Provider> */}
        </DataContext.Provider>
    )
}

