import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Send, 
  ExternalLink
} from 'lucide-react'
import { Facebook, GitHub as Github } from 'react-feather'

interface ContactSectionProps {
  formData: { name: string; email: string; message: string }
  formStatus: 'idle' | 'loading' | 'success' | 'error'
  formMessage: string
  errors: Record<string, string>
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
} as const

export default function ContactSection({
  formData,
  formStatus,
  formMessage,
  errors,
  onFormChange,
  onFormSubmit
}: ContactSectionProps) {
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <Facebook className="w-5 h-5" />, 
      handle: 'Pacifico M. Oyanib III',
      url: 'https://www.facebook.com/thierd.dhee.morshed/',
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    { 
      name: 'GitHub', 
      icon: <Github className="w-5 h-5" />, 
      handle: 'oyanibTech-iii',
      url: 'https://github.com/oyanibTech-iii',
      color: 'hover:text-neutral-900 dark:hover:text-white'
    },
    { 
      name: 'Email', 
      icon: <Mail className="w-5 h-5" />, 
      handle: 'pacificooyanib@gmail.com',
      url: 'mailto:pacificooyanib@gmail.com',
      color: 'hover:text-shamrock-600 dark:hover:text-shamrock-400'
    }
  ]

  return (
    <section id="contact" className="mt-20 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Side: Info & Socials */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
                Let's <span className="text-shamrock-500">Connect</span>
              </h2>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Have a project in mind or just want to discuss some networking concepts? I'm always open to new opportunities and collaborations.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className={`group flex items-center justify-between p-4 rounded-2xl border border-neutral-200/60 bg-white/50 dark:border-neutral-800/60 dark:bg-neutral-900/40 backdrop-blur-md transition-all duration-300 ${link.color}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-white dark:group-hover:bg-neutral-700 transition-colors shadow-sm">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-500 transition-colors">{link.name}</p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{link.handle}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-1"
            >
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-shamrock-500/20 via-transparent to-shamrock-500/10 blur-3xl -z-10 rounded-full" />
              
              <form
                className="relative overflow-hidden space-y-6 p-8 md:p-10 rounded-xl border border-neutral-200/80 bg-white/80 dark:border-neutral-800/80 dark:bg-neutral-900/80 backdrop-blur-xl"
                onSubmit={onFormSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-neutral-700 dark:text-neutral-300 ml-1">
                      <User className="w-4 h-4 text-shamrock-500" />
                      Name
                    </label>
                    <input
                      className={`w-full rounded-xl border ${errors.name ? 'border-red-400' : 'border-neutral-200 dark:border-neutral-800'} bg-white dark:bg-neutral-900 px-5 py-4 text-sm outline-none transition-all focus:ring-4 focus:ring-shamrock-500/10 focus:border-shamrock-500 dark:text-white`}
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={onFormChange}
                      disabled={formStatus === 'loading'}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs font-medium text-red-500 ml-1">
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-neutral-700 dark:text-neutral-300 ml-1">
                      <Mail className="w-4 h-4 text-shamrock-500" />
                      Email
                    </label>
                    <input
                      className={`w-full rounded-xl border ${errors.email ? 'border-red-400' : 'border-neutral-200 dark:border-neutral-800'} bg-white dark:bg-neutral-900 px-5 py-4 text-sm outline-none transition-all focus:ring-4 focus:ring-shamrock-500/10 focus:border-shamrock-500 dark:text-white`}
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={onFormChange}
                      disabled={formStatus === 'loading'}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs font-medium text-red-500 ml-1">
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-neutral-700 dark:text-neutral-300 ml-1">
                    <MessageSquare className="w-4 h-4 text-shamrock-500" />
                    Message
                  </label>
                  <textarea
                    className={`w-full rounded-xl border ${errors.message ? 'border-red-400' : 'border-neutral-200 dark:border-neutral-800'} bg-white dark:bg-neutral-900 px-5 py-4 text-sm outline-none transition-all focus:ring-4 focus:ring-shamrock-500/10 focus:border-shamrock-500 min-h-[150px] resize-none dark:text-white`}
                    name="message"
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={onFormChange}
                    disabled={formStatus === 'loading'}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs font-medium text-red-500 ml-1">
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Status Indicator */}
                <AnimatePresence>
                  {formMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`flex items-center gap-3 p-4 rounded-xl ${
                        formStatus === 'success' 
                        ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-600 border border-red-500/20'
                      }`}
                    >
                      {formStatus === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      <span className="text-sm font-bold">{formMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group overflow-hidden py-5 rounded-2xl bg-shamrock-500 text-white font-bold flex items-center justify-center gap-2 transition-all hover:bg-shamrock-600 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-shamrock-500/25"
                >
                  {formStatus === 'loading' ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}