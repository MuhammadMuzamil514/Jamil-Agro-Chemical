import { Component } from 'react'
import GlobalError from './GlobalError'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    // Keep logging centralized for production monitoring hooks.
    console.error('Application error:', error)
  }

  render() {
    if (this.state.hasError) {
      return <GlobalError title="Application Error" message="A critical issue occurred while rendering this page." />
    }

    return this.props.children
  }
}

export default ErrorBoundary
