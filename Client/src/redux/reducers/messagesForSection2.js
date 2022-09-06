const initialState = {}

export default function messagesForSection2(state = initialState, action) {
    switch (action.type) {
        case "SET_MESSAGES":
            return {
                ...state,
                [action.key]: action.payload
            }
        case "SET_NEW_MESSAGE": {
            return {
                ...state,
                [action.key]: [...state[action.key], action.payload]
            }
        }
        default:
            return state
    }
}