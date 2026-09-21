import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { AnimatedThemeToggle } from "./ui/animated-theme-toggle"

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Graphics', href: '#graphics' },
  { label: 'Web', href: '#web-apks' },
  { label: 'Contact', href: '#contact' },
]

// All portfolio sections ordered from bottom to top, mapped to corresponding nav item ID
const sectionMappings = [
  { id: 'contact', navId: 'contact' },
  { id: 'networking', navId: 'web-apks' },
  { id: 'python-apps', navId: 'web-apks' },
  { id: 'java-desktop', navId: 'web-apks' },
  { id: 'mobile-apps', navId: 'web-apks' },
  { id: 'youtube-tutorials', navId: 'web-apks' },
  { id: 'third-gen', navId: 'web-apks' },
  { id: 'web-apks', navId: 'web-apks' },
  { id: 'layouts', navId: 'graphics' },
  { id: 'facebook-posts', navId: 'graphics' },
  { id: 'graphics', navId: 'graphics' },
  { id: 'workshops', navId: 'about' },
  { id: 'about', navId: 'about' },
  { id: 'home', navId: 'home' },
]

export default function Header() {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '')
      const validNavs = ['home', 'about', 'graphics', 'web-apks', 'contact']
      if (validNavs.includes(hash)) return hash
    }
    return 'home'
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isManualScroll = useRef(false)
  const manualScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      if (isManualScroll.current) {
        ticking = false
        return
      }

      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Check if near the very top of the page
      if (scrollY < 120) {
        setActiveSection('home')
        ticking = false
        return
      }

      // Check if near the bottom of the page
      if (windowHeight + scrollY >= documentHeight - 60) {
        setActiveSection('contact')
        ticking = false
        return
      }

      // Check sections from bottom to top
      const threshold = 180
      for (const section of sectionMappings) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= threshold) {
            setActiveSection(section.navId)
            break
          }
        }
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    // Initial check
    updateActiveSection()

    // Re-check after lazy-loaded components mount
    const timer1 = setTimeout(updateActiveSection, 300)
    const timer2 = setTimeout(updateActiveSection, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      clearTimeout(timer1)
      clearTimeout(timer2)
      if (manualScrollTimer.current) {
        clearTimeout(manualScrollTimer.current)
      }
    }
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    setActiveSection(targetId)

    isManualScroll.current = true
    if (manualScrollTimer.current) {
      clearTimeout(manualScrollTimer.current)
    }
    manualScrollTimer.current = setTimeout(() => {
      isManualScroll.current = false
    }, 800)

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.hash = href
      }
    }

    window.history.pushState(null, '', href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/70 backdrop-blur-md transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center">
            <span className="ml-2 text-2xl font-bold text-neutral-600 transition-colors hover:text-shamrock-500 dark:text-neutral-300 font-clash tracking-wide">pacifico</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 text-sm md:flex relative font-clash">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3 py-1.5 font-medium transition-colors duration-300 ${
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

      {/* Mobile Navigation Bottom Sheet */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm md:hidden"
                style={{ position: 'fixed' }}
              />
              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-0 top-auto left-0 right-0 z-[9999] rounded-t-3xl border-t border-neutral-200/80 bg-white/95 p-6 pb-8 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/95 md:hidden max-h-[85vh] overflow-y-auto"
                style={{ position: 'fixed' }}
              >
                <div className="relative flex items-center justify-center mb-4">
                  <div className="h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute right-0 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.href.replace('#', '')
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={(e) => {
                          setIsMenuOpen(false)
                          handleNavClick(e, item.href)
                        }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-clash font-medium transition-all duration-200 ${
                          isActive 
                            ? 'bg-shamrock-500/10 text-shamrock-600 dark:bg-shamrock-500/20 dark:text-shamrock-400' 
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-shamrock-500 dark:text-neutral-300 dark:hover:bg-neutral-900'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <div className="h-2 w-2 rounded-full bg-shamrock-500" />}
                      </motion.a>
                    )
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  )
}