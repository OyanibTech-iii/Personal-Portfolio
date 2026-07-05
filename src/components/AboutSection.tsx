import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, Cell, LabelList } from 'recharts'
import { ProgressBarCircle } from "@/components/base/progress-indicators/progress-circles"
import profileImg from '../assets/profile.png'
import img01 from '../assets/01.png'
import img02 from '../assets/02.png'
import img03 from '../assets/03.png'
import img04 from '../assets/04.png'
import img05 from '../assets/05.png'
import img06 from '../assets/06.png'
import certImg from '../assets/e-cert.png'
import cert2Img from '../assets/e-cert-2.png'
import cisspCertImg from '../assets/cissp certification.png'
import isc2Cert1Img from '../assets/isc2 cert/cc domain 1.png'
import isc2Cert2Img from '../assets/isc2 cert/cc domain 2.png'
import isc2Cert3Img from '../assets/isc2 cert/cc domain 3.png'
import isc2Cert4Img from '../assets/isc2 cert/cc domain 4.png'
import isc2Cert5Img from '../assets/isc2 cert/cc domain 5.png'
import { ImageWithSkeleton } from './ui/image-with-skeleton'
import { Button } from './ui/button'

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
  { name: 'NextJS React', value: 77 },
  { name: 'Python', value: 38 },
];

export default function AboutSection({ onOpenCertModal }: AboutSectionProps) {
  const [showWorkshops, setShowWorkshops] = useState(false)
  const [showAccreditations, setShowAccreditations] = useState(false)
  const certificates = [
    { src: certImg, title: 'Intellectual Property', issuer: 'Mindoro State University', year: '2025' },
    { src: cert2Img, title: 'Internet of Things', issuer: 'Mindoro State University', year: '2025' },
    { src: cisspCertImg, title: 'CISSP Certification', issuer: 'Cisco', year: '2025' },
    { src: isc2Cert1Img, title: 'Certified in Cybersecurity Domain 1', issuer: 'ISC2', year: '2026' },
    { src: isc2Cert2Img, title: 'Certified in Cybersecurity Domain 2', issuer: 'ISC2', year: '2026' },
    { src: isc2Cert3Img, title: 'Certified in Cybersecurity Domain 3', issuer: 'ISC2', year: '2026' },
    { src: isc2Cert4Img, title: 'Certified in Cybersecurity Domain 4', issuer: 'ISC2', year: '2026' },
    { src: isc2Cert5Img, title: 'Certified in Cybersecurity Domain 5', issuer: 'ISC2', year: '2026' }
  ]

  const workshops = [img01, img02, img03, img04, img05, img06]

  return (
    <section id="about" className="relative isolate overflow-hidden rounded-3xl bg-white/70 p-8 backdrop-blur-sm transition-colors duration-300 dark:bg-neutral-900/50 sm:p-12">
      <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <clipPath id="profile-inverted" clipPathUnits="objectBoundingBox">
            <path d="M0.2,0 H0.8929 A0.1071,0.1071,0,0,1,1,0.1071 V0.8 C1,0.85 0.85,1 0.7,1 H0.1 A0.1,0.1,0,0,1,0,0.9 V0.3 C0.15,0.3 0.2,0.15 0.2,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1 space-y-6"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: '-50px' }}
            src={profileImg}
            alt="Profile portrait"
            className="w-full object-cover shadow-2xl ring-1 ring-neutral-200/70 dark:ring-neutral-800 aspect-square"
            style={{ clipPath: 'url(#profile-inverted)' }}
            loading="lazy"
          />
          
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
          viewport={{ margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Professional Profile</h2>
          <p className="mt-6 max-w-prose text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed text-balance text-left">
            I'm a versatile software engineer and cybersecurity enthusiast focused on building secure, fast,
            and visually cohesive digital ecosystems. I specialize in bridging the gap between robust backend 
            logic and delightful user experiences through clean code and modern design systems.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-3">
            {['React', 'Laravel', 'TypeScript', 'Next.js', 'Python', 'Tailwind CSS'].map(skill => (
              <span key={skill} className="px-3 py-1 text-sm font-medium rounded-full bg-shamrock-500/10 text-shamrock-700 dark:bg-shamrock-500/20 dark:text-shamrock-300 border border-shamrock-500/20">
                {skill}
              </span>
            ))}
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
                      tick={{ fill: 'var(--color-neutral-500)', fontSize: 12, fontWeight: 600 }}
                      width={100}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        borderRadius: '8px', 
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {focusData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill="var(--color-shamrock-500)" fillOpacity={0.6 + (index * 0.1)} />
                      ))}
                      <LabelList 
                        dataKey="value" 
                        position="right" 
                        formatter={(value: any) => `${value}%`} 
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
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-16 max-w-5xl"
      >
        <button 
          onClick={() => setShowWorkshops(!showWorkshops)}
          className="flex items-center justify-between w-full mb-8 group"
        >
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-shamrock-600 dark:group-hover:text-shamrock-400 transition-colors">Workshops & Training</h3>
          <span className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-shamrock-600 dark:group-hover:text-shamrock-400 transition-colors">{showWorkshops ? 'Hide' : 'Show'} Images</span>
        </button>
        {showWorkshops && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {workshops.map((src, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/60 shadow-sm transition-all duration-300 dark:border-neutral-800/70 dark:bg-neutral-900/50"
              >
                <ImageWithSkeleton
                  src={src}
                  alt={`Workshop ${i + 1}`}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  containerClassName="h-full w-full"
                  loading="lazy"
                />
              </motion.figure>
            ))}
          </div>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-16 max-w-5xl"
      >
        <button 
          onClick={() => setShowAccreditations(!showAccreditations)}
          className="flex items-center justify-between w-full mb-8 group"
        >
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-shamrock-600 dark:group-hover:text-shamrock-400 transition-colors">Accreditations</h3>
          <span className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-shamrock-600 dark:group-hover:text-shamrock-400 transition-colors">{showAccreditations ? 'Hide' : 'Show'} Images</span>
        </button>
        {showAccreditations && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((c, i) => (
              <motion.figure 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/60 p-4 shadow-sm transition-all duration-300 dark:border-neutral-800/70 dark:bg-neutral-900/50"
              >
                <img src={c.src} alt={c.title} className="h-40 w-full object-cover rounded-xl mb-4" loading="lazy" />
                <figcaption>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-1">{c.title}</p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{c.issuer} • {c.year}</p>
                  <Button
                    onClick={() => onOpenCertModal(c)}
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full rounded-xl hover:bg-shamrock-500 hover:text-white"
                  >
                    View Credential
                  </Button>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
