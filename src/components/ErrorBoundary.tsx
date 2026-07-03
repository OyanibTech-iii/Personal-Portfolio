import { useState, useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from './ui/button'

interface ErrorState {
  hasError: boolean
  error: Error | null
}

interface Props {
  children: React.ReactNode
  fallback?: (props: { error: Error; reset: () => void }) => React.ReactNode
}

export function ErrorBoundary({ children, fallback }: Props) {
  const [state, setState] = useState<ErrorState>({ hasError: false, error: null })

  useEffect(() => {
    if (state.hasError) {
      console.error('ErrorBoundary caught:', state.error)
    }
  }, [state])

  const reset = () => {
    setState({ hasError: false, error: null })
  }

  if (state.hasError) {
    if (fallback) {
      return fallback({ error: state.error!, reset })
    }
    return <DefaultErrorFallback error={state.error!} reset={reset} />
  }

  return children
}

interface DefaultErrorFallbackProps {
  error: Error
  reset: () => void
}

function DefaultErrorFallback({ error, reset }: DefaultErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
          <p className="mt-2 text-muted-foreground">
            We&apos;re sorry, but something unexpected happened.
          </p>
          <details className="mt-4 text-left text-sm text-muted-foreground">
            <summary className="cursor-pointer mb-2">Error details</summary>
            <pre className="p-3 rounded bg-muted overflow-auto max-h-40">
              {error.message}
            </pre>
          </details>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary