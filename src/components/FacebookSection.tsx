import { motion } from 'framer-motion'
import CtaButton from './CtaButton'

interface FacebookPostLink {
  id: string
  title: string
  description: string
  url: string
  date?: string
  tag?: string
}

const facebookPosts: FacebookPostLink[] = [
  {
    id: 'fb-post-1',
    title: 'Featured Graphic Projects on Facebook',
    description: 'Direct link to my official Facebook post showcasing recent graphic design work, branding concepts, and visual creations.',
    url: 'https://www.facebook.com/share/p/18PLmXsBbq/',
    date: 'Facebook Share',
    tag: 'Official Post'
  }
]

export default function FacebookSection() {
  return (
    <section id="facebook-posts" className="mt-14 py-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-white"
          >
            Facebook Posts & Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-neutral-600 dark:text-neutral-400 max-w-xl text-balance text-sm sm:text-base"
          >
            Direct links to graphic design projects and portfolio work published on Facebook.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {facebookPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-600 shadow-sm"
            >
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <CtaButton
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="arrow"
                size="md"
                className="shrink-0"
              >
                View Post
              </CtaButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
