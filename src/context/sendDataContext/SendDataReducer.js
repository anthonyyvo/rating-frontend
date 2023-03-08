export const INITIAL_STATE = {
    data: null,
    isFetching: false,
    success: false,
    error: false,
}
export const SendDataReducer = (action, state) => {
    switch (action.type) {
        case "SEND_START" : 
        return {
            data: 'start',
            isFetching: true,
            success: false,
            error: false,
        }
        case "SEND_SUCCESS": 
        return {
            data: action.payload,
            isFetching: false,
            success: true,
            error: false
        }
        case "SEND_FAILURE": 
        return {
            data: 'fail',
            isFetching: false,
            error: true,
            success: false,

        }
        default:
            return state;
    }
}