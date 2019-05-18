import React, { Component } from 'react'

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  // set state if error
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // log the error if caught
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  // cannot render error objects
  // check underneath error overlay in development

  render() {
    if (this.state.hasError) {
      return <h1>An error has occured!</h1>;
    }
    else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;