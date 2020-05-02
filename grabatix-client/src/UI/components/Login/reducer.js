import { UPDATE_ERRORS, UPDATE_FIELDS } from "./actions"

const reducer = (state, action) => {
    const { 
		type, payload
    } = action;
    switch (type) {
        case UPDATE_ERRORS: 
            const errors = { ...state.errors }
            errors[payload.name] = payload.value
            return {...state, errors }
        case UPDATE_FIELDS: 
            const fields = { ...state.fields }
            fields[payload.name] = payload.value
            return {...state, fields}
        default: 
            return {...state};
    }
}

export default reducer;