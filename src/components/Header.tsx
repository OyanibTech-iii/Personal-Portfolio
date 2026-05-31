import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { AnimatedThemeToggle } from "./ui/animated-theme-toggle"

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Graphics', href: '#graphics' },
  { label: 'Web', href: '#web-apks' },
  { label: 'Mobile', href: '#mobile-apps' },
  { label: 'Networking', href: '#networking' },
  { label: 'Contact', href: '#contact' },
]

interface HeaderProps {
  // Add props if needed, e.g., for theme toggle
}

export default function Header({}: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navItems.forEach((item) => {
      const element = document.getElementById(item.href.replace('#', ''))
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/70 backdrop-blur-md transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center">
            <span className="ml-2 text-2xl font-bold text-neutral-600 transition-colors hover:text-shamrock-500 dark:text-neutral-300 font-gondola tracking-wide">pacifico</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 text-sm md:flex relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 font-bold transition-colors duration-300 ${
                  isActive 
                    ? 'text-shamrock-600 dark:text-shamrock-400' 
                    : 'text-neutral-600 hover:text-shamrock-500 dark:text-neutral-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-item"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-shamrock-500"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <AnimatedThemeToggle />
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full border-t border-neutral-200/80 bg-white/95 p-6 shadow-xl backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/95 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.replace('#', '')
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-center rounded-xl py-4 text-xl font-bold transition-all duration-300 ${
                      isActive 
                        ? 'bg-shamrock-500/10 text-shamrock-600 dark:bg-shamrock-500/20 dark:text-shamrock-400' 
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-shamrock-500 dark:text-neutral-400 dark:hover:bg-neutral-900'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}