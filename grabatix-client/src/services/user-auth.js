/** @format */
import { callApi } from '../utils/fetch-helpers'

export const userAuthenticationService = async (username, password) => {
  try {
    const { user } = await callApi(`/api/v1/user/login`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      credentials: `include`,
      body: JSON.stringify({ username, password }),
    })
    return user
  } catch (err) {
    console.error(`User Authentication Error`)
    console.error(err)
    throw new Error(err.message)
  }
}
