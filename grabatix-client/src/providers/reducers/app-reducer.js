import { TRANSITION_STATE, ADD_SUBDOMAIN } from "../actions/app-actions"

const reducer = (state, action) => {
    const { 
        type,
        payload
	} = action;
    switch (type) {
        case ADD_SUBDOMAIN:
            return {...state, subdomain: payload.subdomain }
        case TRANSITION_STATE:
            return {...state, appState: payload.appState }
        default: 
            return {...state};
    }
}

export default reducer;