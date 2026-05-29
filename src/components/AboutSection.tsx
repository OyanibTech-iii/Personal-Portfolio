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
  { name: 'Symfony', value: 40 },
  { name: 'Docker', value: 37 },
  { name: 'Sys Admin', value: 36 },
];

export default function AboutSection({ onOpenCertModal }: AboutSectionProps) {
  const certificates = [
    { src: certImg, title: 'Intellectual Property', issuer: 'Mindoro State University', year: '2025' },
    { src: cert2Img, title: 'Internet of Things', issuer: 'Mindoro State University', year: '2025' },
    { src: cisspCertImg, title: 'CISSP Certification', issuer: 'Cisco', year: '2025' },
    { src: isc2Cert1Img, title: 'Certified in Cybersecurity Domain 1', issuer: 'ISC2', year: '2026' },
    { src: isc2Cert2Img, title: 'Certified in Cybersecurity Domain 2', issuer: 'ISC2', year: '2026' }
  ]

  const workshops = [img01, img02, img03, img04, img05, img06]

  return (
    <section id="about" className="relative isolate overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900/50 sm:p-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            src={profileImg}
            alt="Profile portrait"
            className="w-full rounded-2xl object-cover shadow-2xl ring-1 ring-neutral-200/70 dark:ring-neutral-800 aspect-square"
            loading="lazy"
          />
          
          <div className="h-64 w-full">
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">Expertise Map</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="var(--color-neutral-300)" strokeOpacity={0.5} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'var(--color-neutral-500)', fontSize: 10, fontWeight: 500 }} 
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
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '12px', 
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="md:col-span-2">
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
                <ProgressBarCircle size="xs" label="Full-Stack Development" min={0} max={100} value={90} />
                <ProgressBarCircle size="xs" label="Cybersecurity Auditing" min={0} max={100} value={85} />
                <ProgressBarCircle size="xs" label="Cloud Infrastructure" min={0} max={100} value={75} />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-950/30 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-6 uppercase tracking-widest text-center">Current Focus</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={focusData} margin={{ left: -20, right: 30, top: 10, bottom: 10 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: 'var(--color-neutral-500)', fontSize: 12, fontWeight: 600 }}
                      width={80}
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
                      {focusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="var(--color-shamrock-500)" fillOpacity={0.6 + (index * 0.1)} />
                      ))}
                      <LabelList 
                        dataKey="value" 
                        position="right" 
                        formatter={(value: number) => `${value}%`} 
                        className="fill-neutral-500 dark:fill-neutral-400 text-[10px] font-bold" 
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto mt-16 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Workshops & Training</h3>
          <span className="text-xs font-bold text-shamrock-600 uppercase tracking-widest bg-shamrock-500/10 px-2 py-1 rounded">Archive</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {workshops.map((src, i) => (
            <motion.figure 
              key={i} 
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/60 shadow-sm transition-all duration-300 dark:border-neutral-800/70 dark:bg-neutral-900/50"
            >
              <img src={src} alt={`Workshop ${i + 1}`} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" loading="lazy" />
            </motion.figure>
          ))}
        </div>
      </div>
      
      <div className="mx-auto mt-16 max-w-5xl">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-8">Accreditations</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((c, i) => (
            <motion.figure 
              key={i} 
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
      </div>
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-56 w-56 rounded-full bg-shamrock-100 opacity-60 blur-3xl dark:bg-shamrock-800/40" />
    </section>
  )
}
