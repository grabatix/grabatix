import React, {useState} from "react"
import PropTypes from 'prop-types'

import Modal from "../Modal"
import FormRow from "../FormComponents/FormRow"
import InputGroup from "../FormComponents/InputGroup"
import SubmitButton from "../FormComponents/SubmitButton"

import "./index.css"

const LoginModal = ({isLoggedIn, type, isOpen, setOpen}) => {
    const [username, setUsername] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordComfirmation] = useState("");
    const handleInputChange = ({target: { name, value}}) => {
        if (name === 'username') {
          setUsername(value)
        } else if (name === 'companyname') {
          setCompanyname(value)
        } else if (name === 'password') {
          setPassword(value)
        }  else if (name === 'confirmpassword') {
          setPasswordComfirmation(value)
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Submit Clicked")
    }
    let modalAction = type === "login" ? "Log-In" : "Sign-Up";
    if (isLoggedIn) modalAction = "Log-Out";
    return (
        <Modal isOpen={isOpen} setOpen={setOpen}>
            <h2>{ modalAction }</h2>
            <form onSubmit={handleSubmit}>
                { 
                    type === "login" && !isLoggedIn && (
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
                    type === "signup" && !isLoggedIn && (
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
                                    value={companyname}
                                    error={""}
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
                    <SubmitButton handleClick={handleSubmit} value={modalAction} disabled={false}/>
                </FormRow>
            </form>
        </Modal>
    )
}

LoginModal.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default LoginModal;