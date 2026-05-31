import { motion } from 'framer-motion'
import { Download, type LucideIcon } from 'lucide-react'
import { Button } from './ui/button'
import growfico3dLogo from '../assets/3d logo.png'

interface ReactNativeAppsSectionProps {
  onOpenDownloadModal: (project: { title: string; downloadLink: string }) => void
}

interface AppItem {
  title: string
  description: string
  technologies: string[]
  downloadLink: string
  icon: string | LucideIcon
}

export default function ReactNativeAppsSection({ onOpenDownloadModal }: ReactNativeAppsSectionProps) {
  const apps: AppItem[] = [
    {
      title: 'Growfico Mobile',
      description: 'The React Native mobile version of Growfico, designed for on-the-go agriculture management. Features real-time crop monitoring, sustainability tracking, and offline data support.',
      technologies: ['React Native', 'TypeScript', 'Redux', 'Native Modules'],
      downloadLink: 'https://github.com/OyanibTech-iii/OyanibTech-iii-APPDEV_B_OYANIB/releases/download/v1.0.0/app-release.apk',
      icon: growfico3dLogo
    }
  ]

  return (
    <section id="mobile-apps" className="mt-20 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl">React Native CLI Apps</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-balance text-lg">
            High-performance mobile applications built with React Native CLI, focusing on native efficiency and cross-platform consistency.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          {apps.map((app, i) => {
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-neutral-800/80 dark:bg-neutral-900/40 backdrop-blur-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-shamrock-500/10 text-shamrock-600 dark:bg-shamrock-500/20 dark:text-shamrock-400 overflow-hidden shadow-inner">
                    {typeof app.icon === 'string' ? (
                      <img src={app.icon} alt={app.title} className="h-full w-full object-cover p-1" />
                    ) : (
                      <app.icon className="h-6 w-6 md:h-8 md:w-8" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {app.technologies.map(tech => (
                      <span key={tech} className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white transition-colors group-hover:text-shamrock-600 dark:group-hover:text-shamrock-400">
                    {app.title}
                  </h3>
                  <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {app.description}
                  </p>
                </div>

                <div className="mt-8">
                  <Button 
                    onClick={() => onOpenDownloadModal({ title: app.title, downloadLink: app.downloadLink })}
                    variant="outline" 
                    className="w-full group/btn rounded-xl transition-all duration-300 hover:bg-shamrock-500 hover:text-white dark:hover:bg-shamrock-600 border-neutral-200 dark:border-neutral-700"
                  >
                    Download APK (Release)
                    <motion.div
                      animate={{ y: [0, 2, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Download className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
