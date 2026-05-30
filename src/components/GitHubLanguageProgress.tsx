import { useEffect, useState } from 'react'
import { Flat } from '@alptugidin/react-circular-progress-bar'
import { Skeleton } from './ui/skeleton'

function formatPercent(value: number) {
  return Math.round(value)
}

export default function GitHubLanguageProgress({ username = 'OyanibTech-iii' }: { username?: string }) {
  const [data, setData] = useState<{ lang: string; bytes: number; pct: number }[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulated loading delay
    const timer = setTimeout(() => {
      const manualData = [
        { lang: 'HTML', bytes: 42, pct: 42 },
        { lang: 'CSS', bytes: 26, pct: 26 },
        { lang: 'JavaScript', bytes: 10.5, pct: 10.5 },
        { lang: 'TypeScript', bytes: 10, pct: 10 },
        { lang: 'PHP', bytes: 35, pct: 35 },
        { lang: 'MySQL', bytes: 20, pct: 20 },
        { lang: 'Java', bytes: 30, pct: 30 },
        { lang: 'C++', bytes: 25, pct: 25 }
      ]
      setData(manualData)
      setLoading(false)
      setError(null)
    }, 1500)

    return () => clearTimeout(timer)
  }, [username])

  if (loading) {
    return (
      <div className="mt-6">
        <Skeleton className="h-5 w-48 mb-2" />
        <Skeleton className="h-3 w-64 mb-6" />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <Skeleton className="h-[110px] w-[110px] rounded-full" />
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) return <div className="mt-4 text-sm text-red-600">Error: {error}</div>
  if (!data || data.length === 0) return <div className="mt-4 text-sm text-neutral-600">No language data available.</div>

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold">GitHub Language Analytics</h4>
      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">Live breakdown of top languages from GitHub repos for <span className="font-medium">{username}</span>.</p>

      <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-4">
        {data.map((d) => (
          <div key={d.lang} className="flex flex-col items-center gap-3">
            <div style={{ width: '110px', height: '110px' }}>
              <Flat
                progress={formatPercent(d.pct)}
                range={{ from: 0, to: 100 }}
                text={''}
                sign={{ value: '%', position: 'end' }}
                showValue={true}
                showMiniCircle={true}
                sx={{
                  barWidth: 10,
                  valueSize: 16,
                  textSize: 11,
                  fontWeight: 'bold',
                  strokeColor: '#059669',
                  bgStrokeColor: '#d1d5db',
                  valueColor: '#ffffff',
                  textColor: '#111827',
                  textWeight: 'bold',
                  strokeLinecap: 'round',
                  shape: 'full',
                  loadingTime: 1200,
                  valueAnimation: true,
                  intersectionEnabled: false,
                  miniCircleColor: '#059669',
                  miniCircleSize: 8
                }}
              />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{d.lang}</div>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{formatPercent(d.pct)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
