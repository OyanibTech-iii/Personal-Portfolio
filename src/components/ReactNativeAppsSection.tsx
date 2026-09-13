import { motion } from 'framer-motion'
import CtaButton from './CtaButton'

interface ReactNativeAppsSectionProps {
  onOpenDownloadModal: (project: { title: string; downloadLink: string }) => void
}

interface AppItem {
  title: string
  description: string
  technologies: string[]
  downloadLink: string
}

export default function ReactNativeAppsSection({ onOpenDownloadModal }: ReactNativeAppsSectionProps) {
  const apps: AppItem[] = [
    {
      title: 'Growfico Mobile',
      description: 'The React Native mobile version of Growfico, designed for on-the-go agriculture management. Features real-time crop monitoring, sustainability tracking, and offline data support.',
      technologies: ['React Native', 'TypeScript', 'Redux', 'Native Modules'],
      downloadLink: 'https://github.com/OyanibTech-iii/OyanibTech-iii-APPDEV_B_OYANIB/releases/download/v1.0.0/app-release.apk'
    }
  ]

  return (
    <section id="mobile-apps" className="mt-20 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl">React Native CLI Apps</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
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
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-neutral-800/80 dark:bg-neutral-900/40 backdrop-blur-sm"
              >
                <div className="mb-6 flex flex-wrap gap-2">
                  {app.technologies.map(tech => (
                    <span key={tech} className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                      {tech}
                    </span>
                  ))}
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
                  <CtaButton
                    variant="download"
                    fullWidth
                    size="md"
                    onClick={() => onOpenDownloadModal({ title: app.title, downloadLink: app.downloadLink })}
                  >
                    Download APK (Release)
                  </CtaButton>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
