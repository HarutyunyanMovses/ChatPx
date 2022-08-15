const initialState = {
    receivingCall : false,
    callAccepted : false,
    caller : "",
    name : "",
    callerSignal : "",
    myVideo: null,
    userVideo: null,

}

export default function videoCallReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_RECEIVING_CALL":
            return {
                ...state,
                receivingCall: action.payload
            }
               case "SET_CALLER":
            return {
                ...state,
                caller: action.payload
            }
            case "SET_CALLER_NAME":
            return {
                ...state,
                name: action.payload
            }
            case "SET_CALLER_SIGNAL":
                return {
                    ...state,
                    callerSignal: action.payload
                }
                case "SET_CALL_ACCEPTED":
                    return {
                        ...state,
                        callAccepted: action.payload
                    }
                    case "SET_MY_VIDEO":
                        return {
                            ...state,
                            myVideo: action.payload
                        }
                        case "SET_USER_VIDEO":
                            return {
                                ...state,
                                userVideo: action.payload
                            }
            default:
                return state
    }
}