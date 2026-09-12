import { motion } from 'framer-motion'
import type { Post } from '../types/portfolio'

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

interface PostsSectionProps {
  posts: Post[]
}

export default function PostsSection({ posts }: PostsSectionProps) {
  return (
    <section id="posts" className="mt-10 grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <motion.article
          key={post.id}
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          whileHover={{ y: -8 }}
          className="group card">
          <a href={`#/post/${post.id}`} className="block">
            <div className="relative overflow-hidden rounded-xl">
              <motion.img
                src={post.cover}
                alt={post.title}
                className="h-52 w-full object-cover transition-transform duration-500 ease-out"
                whileHover={{ scale: 1.08 }}
                loading="lazy"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent"
              />
            </div>
            <div className="mt-5 space-y-3">
              <motion.div
                className="flex flex-wrap gap-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
              >
                {post.tags.map((t) => (
                  <motion.span key={t} variants={staggerItem} className="tag">{t}</motion.span>
                ))}
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-semibold leading-snug transition-colors group-hover:text-shamrock-500">
                {post.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
                {post.excerpt}
              </motion.p>
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime} read</span>
              </div>
            </div>
          </a>
        </motion.article>
      ))}
    </section>
  )
}