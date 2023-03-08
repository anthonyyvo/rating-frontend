export const INITIAL_STATE = {
    lang: "vi"
};
export const langContextReducer = (langs, action) => {
    switch (action.type) {
        case "ENGLISH": return {
            ...langs,
            lang: 'eng'
        }
        case "VIETNAMESE": return {
            ...langs,
            lang: 'vi'
        }
        default:
            return langs;

    }
}