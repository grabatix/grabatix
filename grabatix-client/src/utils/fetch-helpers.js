/** @format */

import { readValue, cryptValue, removeKey } from '../utils/ls'
const isBrowser = () => typeof window !== 'undefined'

if (isBrowser()) {
  require('whatwg-fetch')

  const fetchIntercept = () => {
    const originalFetch = fetch
    window.__fetch = function () {
      return originalFetch.apply(this, arguments).then(req => {
        let csrfToken = req.headers.get('x-csrf-jwt')
        cryptValue('_dangerous_token', csrfToken)
        return req
      })
    }
  }

  fetchIntercept()
}

/**
 * Asynchronous function
 * @param {string} uri - Endpoint being called
 * @param {Object} [options={}] - Request Options Object to set headers, method, body, etc
 * @param {Boolean} [useIntercept=true] - flag to use normal fetch without intercept
 * @returns {string|Object} - Resolves data being requested or Rejects Error
 */
export async function callApi(uri, options = {}, useIntercept = true) {
  let data
  const csrfToken = readValue('_dangerous_token')
  // need to add logic to set x-auth-token on user-authed calls
  if (csrfToken) {
    if (options.headers) {
      options.headers['x-csrf-jwt'] = csrfToken
    } else {
      options.headers = {
        'x-csrf-jwt': csrfToken,
      }
    }
  }
  try {
    data = await loadData(uri, options, useIntercept)
    return data
  } catch (err) {
    console.error(err)
    if (typeof err == 'string') {
      throw new Error(err)
    } else {
      throw new Error(err.message)
    }
  }
}

/**
 * Calls FETCH API and expects Text or JSON response
 * @param {string} uri -  Endpoint being called
 * @param {Object} [options={}] - Options being passed to Fetch API
 * @returns {Object|string} - will return JSON if contentType is json or String if not, and an Error Object if call failes
 */
async function loadData(uri, options = {}, useIntercept) {
  let response
  if (useIntercept) {
    response = await window.__fetch(uri, options)
  } else {
    response = await fetch(uri, options)
  }
  const contentType = response.headers.get('content-type')
  if (response.status >= 200 && response.status < 300) {
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    } else {
      return response.text()
    }
  } else {
    return getErrorBody(response, contentType).then(body => {
      return Promise.reject(body)
    })
  }
}

async function getErrorBody(response, contentType = 'text') {
  let body
  if (contentType.includes('application/json')) {
    body = await response.json()
  } else {
    body = await response.text()
  }
  return body
}
