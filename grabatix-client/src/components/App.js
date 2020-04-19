import React, { useState, useContext } from "react"
import './App.css';

import { LiveAnnouncer } from "react-aria-live";
import AppRouter from "../routes/AppRouter"
import AuthProvider from "../providers/AuthProvider"
import ErrorBoundary from "./ErrorBoundary"

const App = () => {

  return (
    <LiveAnnouncer>
      <div className="App">
        <div className="site-content">
          <ErrorBoundary>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </ErrorBoundary>
        </div>
      </div>
    </LiveAnnouncer>
  );
}

export default App;
