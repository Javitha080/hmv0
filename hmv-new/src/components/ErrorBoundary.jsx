import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-8">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold font-playfair mb-4">Something went wrong</h1>
            <p className="text-zinc-400 mb-6">An unexpected error occurred. Please try refreshing the page.</p>
            {this.state.error && (
              <details className="text-left text-xs text-zinc-600 mb-6 bg-zinc-900 p-4 rounded-lg">
                <summary className="cursor-pointer font-semibold">Error Details</summary>
                <pre className="mt-2 whitespace-pre-wrap">{this.state.error.message}</pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/80 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
