import React, {useContext, useReducer} from "react"
import PropTypes from 'prop-types'
import { useMatch } from "@reach/router"
import { UPDATE_ERRORS, UPDATE_FIELDS } from "./actions"
import reducer from "./reducer"
import FormRow from "../FormComponents/FormRow"
import InputGroup from "../FormComponents/InputGroup"
import SubmitButton from "../FormComponents/SubmitButton"
import { AuthContext } from '../../../providers/AuthProvider'

import "./index.css"

const Login = () => {
    const adminMatch = useMatch("/admin/*")
    const loginMatch = useMatch("/login");
    const { isLoggedIn, login, signup, logout } = useContext(AuthContext)
    
    const initialState = {
        fields: {
            username: "",
            companyname: "",
            password: "",
            confirmpassword: ""
        },
        errors: {
            username: "",
            companyname: "",
            password: "",
            confirmpassword: ""
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const handleInputChange = ({target: { name, value}}) => {
        dispatch({type: UPDATE_FIELDS, payload: { name, value } });
    }

    let formTitle = !!loginMatch ? "Log-In" : "Sign-Up";
    if (!!adminMatch) {
        formTitle = adminMatch['*'].includes("login") ? "Log-In" : "Sign-Up";
    }
    if (isLoggedIn) {
        formTitle = "Log-Out";
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Submit Clicked")
        if (isLoggedIn) {
            logout();
        } else if (!isLoggedIn && !!loginMatch) {
            login(state.fields.username, state.fields.password)
        } else {
            signup(state.fields.username, state.fields.password, state.fields.companyname)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>{ formTitle }</h2>
            { 
                !!loginMatch && !isLoggedIn && (
                    <FormRow>
                        <InputGroup
                            id="username"
                            label="Email"
                            required={true}
                            type="email"
                            maxLength={120}
                            placeholder="Email Address"
                            disabled={false}
                            // validation={}
                            handleInputChange={handleInputChange}
                            value={state.fields.username}
                            error={state.errors.username}
                        />
                        <InputGroup
                            id="password"
                            label="Password"
                            required={true}
                            type="password"
                            maxLength={120}
                            placeholder="A-z0-9!@#$%^&*()"
                            disabled={false}
                            // validation={}
                            handleInputChange={handleInputChange}
                            value={state.fields.password}
                            error={state.errors.password}
                        />
                    </FormRow>
                )
            }
            {
                !loginMatch && !isLoggedIn && (
                    <>
                        <FormRow>
                            <InputGroup
                                id="username"
                                label="Email Address"
                                required={true}
                                type="email"
                                maxLength={120}
                                placeholder="Email Address"
                                disabled={false}
                                // validation={}
                                handleInputChange={handleInputChange}
                                value={state.fields.username}
                                error={state.errors.username}
                            />
                            {
                                adminMatch && (
                                    <InputGroup
                                        id="companyname"
                                        label="Company Name"
                                        required={true}
                                        type="text"
                                        maxLength={120}
                                        placeholder={"Company Name"}
                                        disabled={false}
                                        validation={".*"}
                                        handleInputChange={handleInputChange}
                                        value={state.fields.companyname}
                                        error={state.errors.companyname}
                                    />
                                )
                            }
                        </FormRow>
                        <FormRow>
                            <InputGroup
                                id="password"
                                label="Choose Password"
                                required={true}
                                type="password"
                                maxLength={120}
                                placeholder="A-z0-9!@#$%^&*()"
                                disabled={false}
                                // validation={}
                                handleInputChange={handleInputChange}
                                value={state.fields.password}
                                error={state.errors.password}
                            />
                            <InputGroup
                                id="confirmpassword"
                                label="Confirm Password"
                                required={true}
                                type="password"
                                maxLength={120}
                                placeholder="Match Password"
                                disabled={false}
                                // validation={}
                                handleInputChange={handleInputChange}
                                value={state.fields.confirmpassword}
                                error={state.errors.confirmpassword}
                            />
                        </FormRow>
                    </>
                )
            }
            <FormRow>
                <SubmitButton handleClick={handleSubmit} value={formTitle} disabled={false}/>
            </FormRow>
        </form>
    )
}

Login.propTypes = {
}

export default Login;