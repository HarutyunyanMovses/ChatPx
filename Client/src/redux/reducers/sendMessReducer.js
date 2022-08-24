const initialState = {
    senderId: "",
    conversationId: "",
    companionId: "",
    message: "",
    type: "message",
}

export default function sendMessReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_SENDER_ID":
            return {
                ...state,
                senderId: action.payload
            }
        case "SET_CONVERSATION_ID":
            return {
                ...state,
                conversationId: action.payload
            }
        case "SET_COMPANION":
            return {
                ...state,
                companionId: action.payload
            }
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.payload
            }
        case "SET_TYPE":
            return {
                ...state,
                type: action.payload
            }
        default:
            return state
    }
}