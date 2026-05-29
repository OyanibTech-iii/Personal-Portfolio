import { motion } from 'framer-motion'
import { ExternalLink, Layout, Quote, QrCode, ShieldAlert, Sprout } from 'lucide-react'
import { Button } from './ui/button'

export default function WebAPKsSection() {
  const apks = [
    {
      name: 'Growfico',
      description: 'An innovative agriculture and sustainability platform designed to optimize crop management and promote eco-friendly farming practices.',
      link: 'https://web-dev-deployment-production.up.railway.app',
      icon: Sprout,
      tags: ['Agriculture', 'Sustainability', 'Tech']
    },
    {
      name: 'Vulnerable Test Space',
      description: 'A purposefully vulnerable web application designed as a controlled environment for penetration testing, security auditing, and ethical hacking practice.',
      link: 'https://oyanibtestspace-1.onrender.com',
      icon: ShieldAlert,
      tags: ['PHP', 'Security', 'Pentesting']
    },
    {
      name: 'Styled QR',
      description: 'A sophisticated QR code generator that allows for custom styling, branding, and high-resolution exports for professional use.',
      link: 'https://styledqr.onrender.com',
      icon: QrCode,
      tags: ['Next.js', 'Utility', 'Design']
    },
    {
      name: 'Web App Launcher',
      description: 'A robust progressive web app platform designed for seamless launching and centralized management of multiple web applications.',
      link: 'https://webapplaucher.netlify.app/',
      icon: Layout,
      tags: ['React', 'PWA', 'Productivity']
    },
    {
      name: 'Random Quote Generator',
      description: 'An inspirational digital space that algorithmically delivers curated quotes for focus, motivation, and creative spark.',
      link: 'https://randomqt-quotegenerator.netlify.app/',
      icon: Quote,
      tags: ['API', 'Frontend', 'Design']
    }
  ]

  return (
    <section id="web-apks" className="mt-20 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl">Web Applications</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-balance text-lg">
            High-performance Progressive Web Apps (PWAs) built with modern frameworks to deliver native-like experiences.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {apks.map((apk, i) => {
            const IconComponent = apk.icon
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-shamrock-500/10 text-shamrock-600 dark:bg-shamrock-500/20 dark:text-shamrock-400">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex gap-2">
                    {apk.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white transition-colors group-hover:text-shamrock-600 dark:group-hover:text-shamrock-400">
                    {apk.name}
                  </h3>
                  <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {apk.description}
                  </p>
                </div>

                <div className="mt-8">
                  <a href={apk.link} target="_blank" rel="noreferrer" className="inline-block w-full">
                    <Button variant="outline" className="w-full group/btn rounded-xl transition-all duration-300 hover:bg-shamrock-500 hover:text-white dark:hover:bg-shamrock-600 border-neutral-200 dark:border-neutral-700">
                      Visit Live Application
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500 animate-pulse">
            Upcoming: Cloud-integrated Dashboard & Real-time Messenger
          </p>
        </motion.div>
      </div>
    </section>
  )
}