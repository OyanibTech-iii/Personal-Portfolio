import { motion } from 'framer-motion'
import { Play, ExternalLink, Monitor, Server } from 'lucide-react'
import { Button } from './ui/button'

export default function YouTubeTutorialsSection() {
  const tutorials = [
    {
      name: 'Windows Server Installation on VirtualBox',
      description: 'Step-by-step guide to installing Windows Server on VirtualBox virtual machine.',
      link: 'https://youtu.be/B2-acqrZJck',
      thumbnail: 'https://img.youtube.com/vi/B2-acqrZJck/maxresdefault.jpg',
      tags: ['Windows Server', 'VirtualBox'],
      icon: Server
    },
    {
      name: 'Windows 10 Pro Installation on VirtualBox',
      description: 'Complete tutorial for installing Windows 10 Pro in a VirtualBox environment.',
      link: 'https://youtu.be/tuEz271T4Ps',
      thumbnail: 'https://img.youtube.com/vi/tuEz271T4Ps/maxresdefault.jpg',
      tags: ['Windows 10', 'Virtualization'],
      icon: Monitor
    }
  ]

  return (
    <section id="youtube-tutorials" className="mt-20 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-12">
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
          >
            <FaYoutube className="h-7 w-7" />
          </motion.div> */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Tutorials</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-balance text-lg">
            Practical guides on systems administration, virtualization, and software installation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {tutorials.map((tutorial, i) => {
            const IconComponent = tutorial.icon
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-neutral-800/80 dark:bg-neutral-900/40 backdrop-blur-sm"
              >
                <a href={tutorial.link} target="_blank" rel="noreferrer" className="block">
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={tutorial.thumbnail} 
                      alt={tutorial.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40 flex items-center justify-center">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30"
                      >
                        <Play className="h-8 w-8 fill-current ml-1" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-shamrock-500/10 text-shamrock-600 dark:bg-shamrock-500/20 dark:text-shamrock-400">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex gap-2">
                        {tutorial.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white transition-colors group-hover:text-shamrock-600 dark:group-hover:text-shamrock-400">
                      {tutorial.name}
                    </h3>
                    <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                      {tutorial.description}
                    </p>

                    <div className="mt-8">
                      <Button variant="outline" className="w-full group/btn rounded-xl transition-all duration-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 border-neutral-200 dark:border-neutral-700 hover:border-red-500 dark:hover:border-red-600">
                        Watch on YouTube
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Button>
                    </div>
                  </div>
                </a>
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
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
            More system administration guides in production...
          </p>
        </motion.div>
      </div>
    </section>
  )
}
