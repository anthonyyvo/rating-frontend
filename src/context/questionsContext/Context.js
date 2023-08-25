import { createContext, useCallback, useReducer, useState } from "react";
import { QuestionsReducer } from "./Reducer";
import axios from "axios";
import { QuestionsContextActions } from "./Action";

export const INITIAL_STATE = {
    questions: {},
    isFetching: null,
    error: null,
    success: null
}
export const QuestionsContext = createContext(INITIAL_STATE);

export const QuestionsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(QuestionsReducer, INITIAL_STATE);
    const [messenger, setMessenger] = useState('');
    const PF = process.env.REACT_APP_SERVER + "/questions/";

    const handleSendData = useCallback(
        async (data) => {
            dispatch({
                type: QuestionsContextActions.GET_QUESTIONS_START,
            });
            setMessenger('loading');
            try {
                const fetchData = await axios.get(`${PF}`);
                setMessenger('success');
                const dataObject = {};
                fetchData.data.forEach(element => {
                    dataObject[element.name] = element
                });
                dispatch({
                    type: QuestionsContextActions.GET_QUESTIONS_SUCCESS,
                    payload: dataObject
                });
                return(fetchData.data);
            } catch (err) {
                setMessenger('error');
            }
        }
    )
    return (
        <QuestionsContext.Provider value={{state, dispatch, handleSendData, messenger }}>
            {children}
        </QuestionsContext.Provider>
    )
}