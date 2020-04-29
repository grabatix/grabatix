import { LOGIN, LOGOUT, EDIT_PROFILE, SIGNUP } from "../actions/auth-actions"
import { PayloadContext } from "twilio/lib/rest/api/v2010/account/recording/addOnResult/payload";
const reducer = (state, action) => {
    const { 
		type, payload
	} = action;
    switch (type) {
        case EDIT_PROFILE: 
            return {...state}
        case LOGIN: 
            return {...state, isLoggedIn: true, user: payload.user}
        case LOGOUT: 
            return {...state, isLoggedIn: false }
        case SIGNUP: 
            return {...state}
        default: 
            return {...state};
    }
}

export default reducer;