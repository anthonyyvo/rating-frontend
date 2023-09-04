import { createContext, useEffect, useReducer } from "react";
import {dataContextReducer, INITIAL_STATE} from './dataContextReducer';



export const DataContext = createContext(INITIAL_STATE);
export const DataContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(dataContextReducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("location", JSON.stringify(state.location))
    }, [state.location])
    return (
        <DataContext.Provider value={{state, dispatch}}>
            {/* <DataDispatchContext.Provider value={dispatch}> */}
            {children}
            {/* </DataDispatchContext.Provider> */}
        </DataContext.Provider>
    )
}

