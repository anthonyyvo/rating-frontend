import {DataContextActions} from "./dataContextActions"
export const INITIAL_STATE = {
    satisfied: null,
    question: '',
    likely: null,
    rating: null,
    location: 1,
    position: null
}
export const  dataContextReducer = function(state, action) {
    switch (action.type) {
        case DataContextActions.SATISFIED: return {
            ...state,
            satisfied: action.payload,
        }
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
        case DataContextActions.LOCATION: return {
            ...state,
            location: action.payload
        }
        case DataContextActions.POSITION: return {
            ...state,
            position: action.payload
        }
        case DataContextActions.REFRESH : return {
            state: INITIAL_STATE,

        }
        default:
             return state;
    }
}