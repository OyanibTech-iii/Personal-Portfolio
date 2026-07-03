import { Home, ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'

export function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center max-w-md">
        <div className="mb-6 text-9xl font-bold text-muted-foreground/20">404</div>
        <h1 className="text-4xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={() => window.history.back()} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button asChild className="gap-2">
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}