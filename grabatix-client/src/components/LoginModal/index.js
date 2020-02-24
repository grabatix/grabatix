import React, {useState} from "react"
import PropTypes from 'prop-types'

import FormRow from "../FormComponents/FormRow"
import InputGroup from "../FormComponents/InputGroup"
import SubmitButton from "../FormComponents/SubmitButton"

import "./index.css"

const LoginModal = ({isLoggedIn, type}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordComfirmation] = useState("");
    const handleInputChange = ({target: { name, value}}) => {
        if (name === 'username') {
          setUsername(value)
        } else if (name === 'password') {
          setPassword(value)
        }  else if (name === 'confirmpassword') {
          setPasswordComfirmation(value)
        }
    }
    return (
        <div className="login-modal">
            <div className="modal-container">
                <h2>{ type === "login" ? "Log-In" : "Sign-Up" }</h2>
                <form onSubmit={()=>{}}>
                    { 
                        type === "login" && (
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
                                    value={username}
                                    error={''}
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
                                    value={password}
                                    error={''}
                                />
                            </FormRow>
                        )
                    }
                    {
                        type === "signup" && (
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
                                        value={username}
                                        error={''}
                                    />
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
                                        value={password}
                                        error={''}
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
                                        value={passwordConfirmation}
                                        error={''}
                                    />
                                </FormRow>
                            </>
                        )
                    }
                    <FormRow>
                        <SubmitButton handleClick={(e)=>{ e.preventDefault(); console.log("Submit Clicked");}} value="Log In"/>
                    </FormRow>
                </form>
            </div>
        </div>
    )
}

LoginModal.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
}

export default LoginModal;