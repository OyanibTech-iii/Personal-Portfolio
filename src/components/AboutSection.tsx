import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaBehance } from 'react-icons/fa'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, Cell, LabelList } from 'recharts'
import { ProgressBarCircle } from "@/components/base/progress-indicators/progress-circles"
import SpecularButton from "@/components/SpecularButton"
import profileImg from '../assets/prof.webp'

import certImg from '../assets/e-cert.webp'
import cert2Img from '../assets/e-cert-2.webp'
import cisspCertImg from '../assets/cissp certification.webp'
import isc2Cert1Img from '../assets/isc2 cert/cc domain 1.webp'
import isc2Cert2Img from '../assets/isc2 cert/cc domain 2.webp'
import isc2Cert3Img from '../assets/isc2 cert/cc domain 3.webp'
import isc2Cert4Img from '../assets/isc2 cert/cc domain 4.webp'
import isc2Cert5Img from '../assets/isc2 cert/cc domain 5.webp'
import { Button } from './ui/button'
import { ImageWithSkeleton } from './ui/image-with-skeleton'
import { preloadImages } from '@/lib/image-cache'

interface AboutSectionProps {
  onOpenCertModal: (cert: { src: string; title: string; issuer: string; year: string; url?: string }) => void
}

const skillData = [
  { subject: 'Frontend', A: 95, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'UI/UX Design', A: 90, fullMark: 100 },
  { subject: 'Cybersecurity', A: 80, fullMark: 100 },
  { subject: 'Networking', A: 75, fullMark: 100 },
  { subject: 'Mobile Dev', A: 85, fullMark: 100 },
];

const focusData = [
  { name: 'Sys Admin', value: 32 },
  { name: 'Symfony', value: 74 },
  { name: 'Docker', value: 37 },
  { name: 'Laravel', value: 23 },
  { name: 'NextJS React', value: 42.6 },
  { name: 'Python', value: 38 },
];

export default function AboutSection({ onOpenCertModal }: AboutSectionProps) {
  // Default state is hidden
  const [showAccreditations, setShowAccreditations] = useState(false)

  const certificates = useMemo(() => [
    { src: certImg, title: 'Intellectual Property', issuer: 'Mindoro State University', year: '2025' },
    { src: cert2Img, title: 'Internet of Things', issuer: 'Mindoro State University', year: '2025' },
    { src: cisspCertImg, title: 'CISSP Certification', issuer: 'Cisco', year: '2025' },
    { src: isc2Cert1Img, title: 'Certified in Cybersecurity Domain 1', issuer: 'ISC2', year: '2026' },
    { src: isc2Cert2Img, title: 'Certified in Cybersecurity Domain 2', issuer: 'ISC2', year: '2026' },
    { src: isc2Cert3Img, title: 'Certified in Cybersecurity Domain 3', issuer: 'ISC2', year: '2026' },
    { src: isc2Cert4Img, title: 'Certified in Cybersecurity Domain 4', issuer: 'ISC2', year: '2026' },
    { src: isc2Cert5Img, title: 'Certified in Cybersecurity Domain 5', issuer: 'ISC2', year: '2026' }
  ], [])

  // Pre-cache certificate images into browser and memory cache
  const handlePreload = useCallback(() => {
    preloadImages(certificates.map((c) => c.src))
  }, [certificates])

  // Preload on idle so images are ready before user clicks
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        handlePreload()
      })
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle)
        }
      }
    } else {
      const timer = setTimeout(handlePreload, 1200)
      return () => clearTimeout(timer)
    }
  }, [handlePreload])

  const toggleAccreditations = () => {
    setShowAccreditations((prev) => !prev)
  }

  return (
    <section id="about" className="relative isolate overflow-hidden rounded-3xl bg-white/70 p-8 backdrop-blur-sm transition-colors duration-300 dark:bg-neutral-900/50 sm:p-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1 space-y-6"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            src={profileImg}
            alt="Profile portrait"
            className="w-full object-contain rounded-lg"
            loading="lazy"
          />
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <SpecularButton
              size="sm"
              radius={18}
              tintOpacity={0}
              blur={0}
              lineColor="#ffffff"
              baseColor="#71717a"
              intensity={1}
              shineSize={12}
              shineFade={40}
              thickness={1}
              followMouse
              proximity={250}
              autoAnimate={false}
              onClick={() => window.open('https://www.behance.net/pacificooyanibcreate', '_blank', 'noreferrer')}
            >
              <span className="inline-flex items-center gap-2">
                <FaBehance className="h-4 w-4" />
                pacificooyanibcreate
              </span>
            </SpecularButton>
            <SpecularButton
              size="sm"
              radius={18}
              tintOpacity={0}
              blur={0}
              lineColor="#ffffff"
              baseColor="#24292f"
              intensity={1}
              shineSize={12}
              shineFade={40}
              thickness={1}
              followMouse
              proximity={250}
              autoAnimate={false}
              onClick={() => window.open('https://github.com/OyanibTech-iii', '_blank', 'noreferrer')}
            >
              <span className="inline-flex items-center gap-2">
                <FaGithub className="h-4 w-4" />
                OyanibTech-iii
              </span>
            </SpecularButton>
          </div>

          <div className="h-64 w-full ">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="var(--color-shamrock-500)" strokeOpacity={0.6} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10, fontWeight: 600 }} 
                />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="var(--color-shamrock-500)"
                  fill="var(--color-shamrock-500)"
                  fillOpacity={0.3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-background)', 
                    borderRadius: '12px', 
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    color: 'var(--color-foreground)'
                  }}
                  itemStyle={{ color: 'var(--color-foreground)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Professional Profile</h2>
          <p className="mt-6 max-w-prose text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed text-balance text-left">
            I'm a versatile software engineer and cybersecurity enthusiast focused on building secure, fast,
            and visually cohesive digital ecosystems. I specialize in bridging the gap between robust backend 
            logic and delightful user experiences through clean code and modern design systems.
          </p>
          
          <div className="mt-8">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Bachelor of Information Technology</h3>
            <p className="text-sm font-medium text-shamrock-600 dark:text-shamrock-400 mt-1">Negros Oriental State University</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950/30 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-8 uppercase tracking-widest text-center">Core Competencies</h3>
              <div className="flex flex-wrap justify-center gap-6">
                <ProgressBarCircle size="xs" label="Full-Stack Development" min={0} max={100} value={70} />
                <ProgressBarCircle size="xs" label="Cybersecurity" min={0} max={100} value={30} />
                <ProgressBarCircle size="xs" label="UI/UX Design" min={0} max={100} value={90} />
                <ProgressBarCircle size="xs" label="Machine Learning" min={0} max={100} value={23} />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950/30 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-6 uppercase tracking-widest text-center">Current Focus</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={focusData} margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12, fontWeight: 600 }}
                      width={100}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ 
                        backgroundColor: 'var(--color-background)', 
                        borderRadius: '8px', 
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        color: 'var(--color-foreground)'
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {focusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill="var(--color-shamrock-500)" fillOpacity={0.6 + (index * 0.1)} />
                      ))}
                      <LabelList 
                        dataKey="value" 
                        position="right" 
                        formatter={(value) => `${value}%`} 
                        className="fill-neutral-500 dark:fill-neutral-400 text-[10px] font-bold" 
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      
      <div className="mx-auto mt-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            type="button"
            onClick={toggleAccreditations}
            onMouseEnter={handlePreload}
            onFocus={handlePreload}
            className="flex items-center justify-between w-full mb-8 group cursor-pointer"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <h3 className="text-base sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-shamrock-600 dark:group-hover:text-shamrock-400 transition-colors">
                Accreditations
              </h3>
              <span className="rounded-full bg-neutral-100 dark:bg-neutral-800/80 px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60">
                {certificates.length}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-shamrock-600 dark:group-hover:text-shamrock-400 transition-colors whitespace-nowrap">
              {showAccreditations ? 'Hide Images' : 'Show Images'}
            </span>
          </button>
        </motion.div>
        {showAccreditations && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((c, i) => (
              <motion.figure 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/60 p-4 shadow-sm transition-all duration-300 dark:border-neutral-800/70 dark:bg-neutral-900/50"
              >
                <ImageWithSkeleton
                  src={c.src}
                  alt={c.title}
                  containerClassName="h-40 w-full rounded-xl mb-4"
                  className="h-full w-full object-cover rounded-xl"
                  loading="lazy"
                />
                <figcaption>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-1">{c.title}</p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{c.issuer} • {c.year}</p>
                  <Button
                    onClick={() => onOpenCertModal(c)}
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full rounded-xl hover:bg-shamrock-500 hover:text-white cursor-pointer"
                  >
                    View Credential
                  </Button>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
