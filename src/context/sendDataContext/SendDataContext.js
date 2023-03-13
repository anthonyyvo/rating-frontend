import axios from "axios";
import { createContext, useCallback, useEffect, useReducer, useState } from "react";
import { SendDataReducer, INITIAL_STATE } from "./SendDataReducer";

export const SendDataContext = createContext(INITIAL_STATE);
export const SendDataContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SendDataReducer, INITIAL_STATE);
    const [messenger, setMessenger] = useState('');
    const PF = process.env.REACT_APP_SERVER + "/rating"

    const handleSendData = useCallback(
        async (data) => {
            dispatch({
                type: "SEND_START",
            });
            setMessenger('loading');
            try {
                const fetchData = await axios.post(`${PF}`, data);
                setMessenger('success');
                dispatch({
                    type: "SEND_SUCCESS",
                    payload: fetchData.data
                });
            } catch (err) {
                setMessenger('error');
            }
        }
    )
    useEffect(() => {
    }, [])

    return (
        <SendDataContext.Provider
            value={{ dispatch, state, handleSendData, messenger }}
        >
            {children}
        </SendDataContext.Provider>
    )
}