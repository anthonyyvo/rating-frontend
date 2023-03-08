import axios from "axios";
import { createContext, useCallback, useEffect, useReducer, useState } from "react";
import { SendDataReducer, INITIAL_STATE } from "./SendDataReducer";

export const SendDataContext = createContext(INITIAL_STATE);
export const SendDataContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SendDataReducer, INITIAL_STATE);
    const [messenger, setMessenger] = useState('');
    const handleSendData = useCallback(
        async (data) => {
            dispatch({
                type: "SEND_START",
            });
            setMessenger('loading');
            try {
                const fetchData = await axios.post("http://localhost:5000/api/rating/", data);
                setMessenger('success');
                dispatch({
                    type: "SEND_SUCCESS",
                    payload: fetchData.data
                });
                console.log(fetchData);
            } catch (err) {
                setMessenger('error');
            }
        }
    )
    useEffect(() => {
        console.log(messenger)
    }, [messenger])

    return (
        <SendDataContext.Provider
            value={{ dispatch, state, handleSendData, messenger }}
        >
            {children}
        </SendDataContext.Provider>
    )
}