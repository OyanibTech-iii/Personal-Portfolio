
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/80 bg-white/70 backdrop-blur-md transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center">
            <span className="ml-2 text-2xl font-bold *:text-neutral-600 transition-colors hover:text-shamrock-500 dark:text-neutral-300 font-gondola tracking-wide">pacifico</span>
        </a>
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
                    : '*:text-neutral-600 hover:text-shamrock-500 dark:text-neutral-300'
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
        <div className="flex items-center gap-4">
          <AnimatedThemeToggle />
        </div>
      </div>
    </header>
  )
}