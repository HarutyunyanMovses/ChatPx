const initialState = {
    isOpenEditPeronalInfo:false,

}

export default function editPersonalInfoReducer(state = initialState, action) {
    switch (action.type) {
            case "IS_OPEN_EDIT_PERSONAL_INFO":
                return {
                  ...state,  isOpenEditPeronalInfo: action.payload
                }
            default:
                return state
    }
}