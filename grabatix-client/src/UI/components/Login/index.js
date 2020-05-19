/** @format */

import React, { useContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMatch, redirectTo } from '@reach/router'
import { UPDATE_ERRORS, UPDATE_FIELDS } from './actions'
import reducer from './reducer'
import FormRow from '../FormComponents/FormRow'
import InputGroup from '../FormComponents/InputGroup'
import SubmitButton from '../FormComponents/SubmitButton'
import { AuthContext } from '../../../providers/AuthProvider'

import './index.css'

const Login = ({ ctx }) => {
  const adminMatch = useMatch(`/admin/*`)
  const attendantMatch = useMatch(`/attendant/*`)
  const loginMatch = useMatch(`/login`)
  const { isLoggedIn, login, signup, logout } = useContext(AuthContext)

  const initialState = {
    fields: {
      username: ``,
      companyname: ``,
      password: ``,
      confirmpassword: ``,
    },
    errors: {
      username: ``,
      companyname: ``,
      password: ``,
      confirmpassword: ``,
    },
  }
  const [{ fields, errors }, dispatch] = useReducer(reducer, initialState)

  const handleInputChange = ({ target: { name, value } }) => {
    dispatch({ type: UPDATE_FIELDS, payload: { name, value } })
  }

  const validateInput = ({ target: { name, value } }) => {
    console.log({ name, value })
    switch (name) {
      case `username`:
        break
      case `companyname`:
        break
      case `password`:
        break
      case `confirmpassword`:
        break
      default:
        break
    }
  }

  let formTitle = !!loginMatch ? `Log-In` : `Sign-Up`
  if (!!adminMatch) {
    formTitle = adminMatch[`*`].includes(`login`) ? `Log-In` : `Sign-Up`
  }
  if (isLoggedIn) {
    formTitle = `Log-Out`
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(`Submit Clicked`)
    if (isLoggedIn) {
      logout()
    } else if (!isLoggedIn && !!loginMatch) {
      login(fields.username, fields.password)
    } else {
      signup(fields.username, fields.password, fields.companyname)
    }
  }

  let to = `/`
  let from = loginMatch ? `/login` : `/signup`
  if (adminMatch) {
    to = `/admin`
    from = loginMatch ? `/admin/login` : `/admin/signup`
  }
  if (attendantMatch) {
    to = `/attendant`
    from = loginMatch ? `/attendant/login` : `/attendant/signup`
  }

  useEffect(() => {
    if (isLoggedIn) {
      redirectTo(to)
    }
    return () => {}
  }, [isLoggedIn])

  return (
    <form onSubmit={handleSubmit}>
      {!isLoggedIn && <h2>{formTitle}</h2>}
      {!!loginMatch && !isLoggedIn && (
        <FormRow>
          <InputGroup
            id="username"
            label="Email"
            required={true}
            type="email"
            maxLength={120}
            placeholder="Email Address"
            disabled={false}
            // validation={".*"}
            handleBlur={validateInput}
            handleInputChange={handleInputChange}
            value={fields.username}
            error={errors.username}
          />
          <InputGroup
            id="password"
            label="Password"
            required={true}
            type="password"
            maxLength={120}
            placeholder="A-z0-9!@#$%^&*()"
            disabled={false}
            // validation={".*"}
            handleBlur={validateInput}
            handleInputChange={handleInputChange}
            value={fields.password}
            error={errors.password}
          />
        </FormRow>
      )}
      {!loginMatch && !isLoggedIn && (
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
              handleBlur={validateInput}
              handleInputChange={handleInputChange}
              value={fields.username}
              error={errors.username}
            />
            {adminMatch && (
              <InputGroup
                id="companyname"
                label="Company Name"
                required={true}
                type="text"
                maxLength={120}
                placeholder={`Company Name`}
                disabled={false}
                // validation={".*"}
                handleBlur={validateInput}
                handleInputChange={handleInputChange}
                value={fields.companyname}
                error={errors.companyname}
              />
            )}
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
              handleBlur={validateInput}
              handleInputChange={handleInputChange}
              value={fields.password}
              error={errors.password}
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
              handleBlur={validateInput}
              handleInputChange={handleInputChange}
              value={fields.confirmpassword}
              error={errors.confirmpassword}
            />
          </FormRow>
        </>
      )}
      <FormRow>
        <SubmitButton
          handleClick={handleSubmit}
          value={formTitle}
          disabled={false}
        />
      </FormRow>
    </form>
  )
}

Login.propTypes = {
  ctx: PropTypes.object,
}

export default Login
