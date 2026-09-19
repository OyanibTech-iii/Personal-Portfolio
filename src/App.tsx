import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import emailjs from '@emailjs/browser'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ToastNotification from './components/ToastNotification'

// Lazy-loaded sections to reduce initial bundle size and optimize LCP/FCP
const AboutSection = lazy(() => import('./components/AboutSection'))
const WorkshopsSection = lazy(() => import('./components/WorkshopsSection'))
const GraphicsSection = lazy(() => import('./components/GraphicsSection'))
const FacebookSection = lazy(() => import('./components/FacebookSection'))
const LayoutsSection = lazy(() => import('./components/LayoutsSection'))
const WebAPKsSection = lazy(() => import('./components/WebAPKsSection'))
const ThirdGenSection = lazy(() => import('./components/ThirdGenSection'))
const YouTubeTutorialsSection = lazy(() => import('./components/YouTubeTutorialsSection'))
const JavaAppsSection = lazy(() => import('./components/JavaAppsSection'))
const PythonAppsSection = lazy(() => import('./components/PythonAppsSection'))
const ReactNativeAppsSection = lazy(() => import('./components/ReactNativeAppsSection'))
const NetworkingSection = lazy(() => import('./components/NetworkingSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const CertificateModal = lazy(() => import('./components/CertificateModal'))
const DeviceModal = lazy(() => import('./components/DeviceModal'))
const DownloadModal = lazy(() => import('./components/DownloadModal'))
const ChatBot = lazy(() => import('./components/ChatBot'))
const NotFound = lazy(() => import('./components/NotFound').then(m => ({ default: m.NotFound })))
const ComingSoon = lazy(() => import('./components/ComingSoon').then(m => ({ default: m.ComingSoon })))

function SectionSkeleton() {
  return (
    <div className="w-full py-16 animate-pulse" aria-hidden="true">
      <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-48 mx-auto mb-4" />
      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-72 mx-auto mb-8" />
      <div className="h-48 bg-neutral-100 dark:bg-neutral-900 rounded-2xl w-full" />
    </div>
  )
}


function Portfolio() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCert, setModalCert] = useState<{ src: string; title: string; issuer: string; year: string; url?: string } | null>(null)
  const [modalDevice, setModalDevice] = useState<{ src: string; title: string; desc: string; images?: string[] } | null>(null)
  const [downloadModalProject, setDownloadModalProject] = useState<{ title: string; downloadLink: string } | null>(null)

  // Contact form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [cooldown, setCooldown] = useState(0)

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('gpNvhzI1YO36ma29S') // Replace with your EmailJS public key
  }, [])

  useEffect(() => {
    // prevent body scroll when modal is open
    if (modalOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  // Auto-clear error messages after 2 seconds
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({})
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldown])

  // Auto-clear form messages after 2 seconds
  useEffect(() => {
    if (formMessage) {
      const timer = setTimeout(() => {
        setFormMessage('')
        setFormStatus('idle')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [formMessage])

  const openCertModal = (c: { src: string; title: string; issuer: string; year: string; url?: string }) => {
    setModalCert(c)
    setModalOpen(true)
  }

  const closeCertModal = () => {
    setModalOpen(false)
    setTimeout(() => setModalCert(null), 200)
  }

  const openDeviceModal = (d: { src: string; title: string; desc: string; images?: string[] }) => {
    setModalDevice(d)
    setModalOpen(true)
  }

  const closeDeviceModal = () => {
    setModalOpen(false)
    setTimeout(() => setModalDevice(null), 200)
  }

  const openDownloadModal = (project: { title: string; downloadLink: string }) => {
    setDownloadModalProject(project)
  }

  const closeDownloadModal = () => {
    setDownloadModalProject(null)
  }

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'
    else if (formData.message.length > 500) newErrors.message = 'Message cannot exceed 500 characters'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setToast({ type: 'error', message: 'Please fill in all required fields correctly.' })
      return
    }

    if (cooldown > 0) {
      setToast({ type: 'error', message: `Please wait ${cooldown} seconds before sending another message.` })
      return
    }

    setFormStatus('loading')

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_0cp1z94', // Replace with your EmailJS service ID
        'template_0x0k9qg', // Replace with your EmailJS template ID
        {
          to_email: 'pacificooyanib@gmail.com',
          // Use a verified sender address for `from_email` to avoid DMARC/SPF rewriting by Gmail
          from_name: formData.name,
          from_email: 'pacificooyanib@gmail.com',
          // Set reply_to so replies go to the visitor's address and include user_email for template rendering
          reply_to: formData.email,
          user_email: formData.email,
          message: formData.message,
        }
      )

      setFormStatus('success')
      setFormMessage('Message sent successfully! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
      setToast({ type: 'success', message: 'Email sent successfully!' })
      setCooldown(20) // 20 seconds cooldown
    } catch (error) {
      const emailError = error as { status?: number; text?: string };
      console.error('Email send error:', emailError)
      console.error('Error status:', emailError?.status)
      console.error('Error text:', emailError?.text)
      
      // Fallback to mailto if EmailJS fails (400, 401, 403, 412)
      if (emailError?.status === 400 || emailError?.status === 401 || emailError?.status === 403 || emailError?.status === 412) {
        console.log('Falling back to mailto due to status:', emailError?.status)
        const mailtoLink = `mailto:pacificooyanib@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' <' + formData.email + '>')}`
        window.location.href = mailtoLink
        return
      }
      
      setFormStatus('error')
      setFormMessage('Failed to send message. Please check the console or use the email address directly: pacificooyanib@gmail.com')
      setToast({ type: 'error', message: 'Failed to send email. Visit /contact for alternatives.' })
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-6xl px-6">
        <section id="home">
          <Hero />
        </section>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection onOpenCertModal={openCertModal} />
          <WorkshopsSection />
          <GraphicsSection onOpenDeviceModal={openDeviceModal} />
          <FacebookSection />
          <LayoutsSection onOpenDeviceModal={openDeviceModal} />
          <WebAPKsSection />
          <ThirdGenSection />
          <YouTubeTutorialsSection />
          <ReactNativeAppsSection onOpenDownloadModal={openDownloadModal} />
          <JavaAppsSection onOpenDownloadModal={openDownloadModal} />
          <PythonAppsSection onOpenDownloadModal={openDownloadModal} />
          <NetworkingSection />
          <ContactSection
            formData={formData}
            formStatus={formStatus}
            formMessage={formMessage}
            errors={errors}
            cooldown={cooldown}
            onFormChange={handleFormChange}
            onFormSubmit={handleFormSubmit}
          />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <CertificateModal cert={modalCert} onClose={closeCertModal} />
        <DeviceModal device={modalDevice} onClose={closeDeviceModal} />
        <DownloadModal project={downloadModalProject} onClose={closeDownloadModal} />
        <ChatBot />
      </Suspense>
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Suspense fallback={<SectionSkeleton />}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/instagram" element={<ComingSoon platform="Instagram" />} />
          <Route path="/linkedin" element={<ComingSoon platform="LinkedIn" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <SpeedInsights />
    </>
  )
}
