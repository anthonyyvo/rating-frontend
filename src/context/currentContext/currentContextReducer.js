import slidesList from "../../libs/data";

export const INITIAL_STATE = {
    currentItem: 0,
    itemsLength: 5
};
export const currentContextReducer = (current, action) => {
    const item =  current.currentItem;
    const length = current.itemsLength - 1;
    switch (action.type) {
        case "FORWARD": return {
            ...current,
            currentItem: item < length ? item + 1 : 0
        }
        case "BACKWARD": return {
            ...current,
            currentItem: item > 0 ? item - 1:  length
        }
        case "SET_CURRENT" : return {
            ...current,
            currentItem: action.payload + 1
        }
        case "BYPASS" : return {
            ...current,
            currentItem: action.payload + 2
        }
        default:
            return current;

    }
}