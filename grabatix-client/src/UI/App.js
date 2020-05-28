/** @format */

import React, { useEffect, useContext } from 'react'
import './App.css'

import { LiveAnnouncer } from 'react-aria-live'
import { createHistory, LocationProvider } from '@reach/router'

import AppRouter from '../routes/AppRouter'
import { AppContext } from '../providers/AppProvider'
import AuthProvider from '../providers/AuthProvider'
import Loading from './components/Loading'
import ErrorBoundary from './components/ErrorBoundary'

let history = createHistory(window)

const App = () => {
  const { appState, transitionToState, addSubdomain, subdomain } = useContext(AppContext)

  useEffect(() => {
    if (typeof subdomain === `undefined`) {
      addSubdomain()
    } else if (appState.loading && typeof subdomain !== `undefined`) {
      transitionToState(`LOADED_STATE`)
    }
  }, [subdomain])

  return (
    <LocationProvider history={history}>
      <LiveAnnouncer>
        <div className="App">
          <div className="site-content">
            <ErrorBoundary>
              <AuthProvider>{appState.loading ? <Loading /> : <AppRouter />}</AuthProvider>
            </ErrorBoundary>
          </div>
        </div>
      </LiveAnnouncer>
    </LocationProvider>
  )
}

export default App
