/** @format */

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import './vendors'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './UI/App'
import AppProvider from './providers/AppProvider'
import * as Sentry from '@sentry/browser'
import * as serviceWorker from './serviceWorker'

Sentry.init({
  dsn: `https://e9e7b9abd31045b58f533369363bfcde@sentry.io/1874311`,
})

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById(`root`)
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
