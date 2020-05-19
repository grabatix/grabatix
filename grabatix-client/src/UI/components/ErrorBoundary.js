/** @format */

import React, { Component } from 'react'

/**
 * ErrorBoundary is an HOC to catch errors unhandled by its component children using the componentDidCatch lifecycle event
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static get name() {
    return Component.name
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error(`Error Boundary Notification`)
    console.error(error)
    console.error(info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Error!!!</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
