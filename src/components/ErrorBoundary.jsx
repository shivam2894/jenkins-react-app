import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo){
    console.log('Logging ',error,errorInfo);
  }

  render() {
    if(this.state.hasError){
        return (
            <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
              <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-16">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                      404 error
                    </p>
                    <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                      Something went wrong.
                    </h1>
                    <p className="mt-2 text-base text-gray-500">
                      Sorry, for the inconvinience
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/user"
                        className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Go back home<span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
        );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;