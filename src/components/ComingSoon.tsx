import { Home, ArrowLeft, Construction } from 'lucide-react'
import { Button } from './ui/button'

interface ComingSoonProps {
  platform: string
}

export function ComingSoon({ platform }: ComingSoonProps) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <Construction className="h-24 w-24 text-muted-foreground/20" strokeWidth={1} />
        </div>
        <h1 className="text-4xl font-bold mb-3">Coming Soon</h1>
        <p className="text-muted-foreground mb-8">
          My {platform} page is under construction. Stay tuned for updates!
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
