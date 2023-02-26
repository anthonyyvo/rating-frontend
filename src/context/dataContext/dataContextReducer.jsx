import {DataContextActions} from "./dataContextActions"
export const INITIAL_STATE = {
    question: '',
    likely: null,
    rating: null,
}
export const  dataContextReducer = function(state, action) {
    switch (action.type) {
        case DataContextActions.QUESTION: return {
            ...state,
            question: action.payload,
        }
        case DataContextActions.LIKELY: return {
            ...state,
            likely: action.payload
        }
        case DataContextActions.RATING: return {
            ...state,
            rating: action.payload
        }
        case 'REFRESH' : return {
            state: INITIAL_STATE,

        }
        default:
             return state;
    }
}