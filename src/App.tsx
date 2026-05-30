import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import Header from './components/Header'
import Hero from './components/Hero'
import GraphicsSection from './components/GraphicsSection'
import WebAPKsSection from './components/WebAPKsSection'
import YouTubeTutorialsSection from './components/YouTubeTutorialsSection'
import JavaAppsSection from './components/JavaAppsSection'
import PythonAppsSection from './components/PythonAppsSection'
import ReactNativeAppsSection from './components/ReactNativeAppsSection'
import AboutSection from './components/AboutSection'
import NetworkingSection from './components/NetworkingSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CertificateModal from './components/CertificateModal'
import DeviceModal from './components/DeviceModal'
import DownloadModal from './components/DownloadModal'
import ToastNotification from './components/ToastNotification'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCert, setModalCert] = useState<{ src: string; title: string; issuer: string; year: string; url?: string } | null>(null)
  const [modalDevice, setModalDevice] = useState<{ src: string; title: string; desc: string } | null>(null)
  const [downloadModalProject, setDownloadModalProject] = useState<{ title: string; downloadLink: string } | null>(null)

  // Contact form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

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

  const openDeviceModal = (d: { src: string; title: string; desc: string }) => {
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
      setToast({ type: 'error', message: 'Please fix the errors above' })
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

      // Clear toast after 2 seconds
      setTimeout(() => {
        setToast(null)
      }, 2000)
    } catch (error: any) {
      console.error('Email send error:', error)
      console.error('Error status:', error?.status)
      console.error('Error text:', error?.text)
      
      // Fallback to mailto if EmailJS fails (400, 401, 403, 412)
      if (error?.status === 400 || error?.status === 401 || error?.status === 403 || error?.status === 412) {
        console.log('Falling back to mailto due to status:', error?.status)
        const mailtoLink = `mailto:pacificooyanib@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' <' + formData.email + '>')}`
        window.location.href = mailtoLink
        return
      }
      
      setFormStatus('error')
      setFormMessage('Failed to send message. Please check the console or use the email address directly: pacificooyanib@gmail.com')
      setToast({ type: 'error', message: 'Failed to send email' })
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-6xl px-6">
        <section id="home">
          <Hero />
        </section>
        <AboutSection onOpenCertModal={openCertModal} />
        <GraphicsSection onOpenDeviceModal={openDeviceModal} />
        <WebAPKsSection />
        <YouTubeTutorialsSection />
        <ReactNativeAppsSection onOpenDownloadModal={openDownloadModal} />
        <JavaAppsSection onOpenDownloadModal={openDownloadModal} />
        <PythonAppsSection onOpenDownloadModal={openDownloadModal} />
        <NetworkingSection onOpenDeviceModal={openDeviceModal} />
        <ContactSection
          formData={formData}
          formStatus={formStatus}
          formMessage={formMessage}
          errors={errors}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
      </main>
      <Footer />
      <CertificateModal cert={modalCert} onClose={closeCertModal} />
      <DeviceModal device={modalDevice} onClose={closeDeviceModal} />
      <DownloadModal project={downloadModalProject} onClose={closeDownloadModal} />
      <ToastNotification toast={toast} />
    </div>
  )
}

export default App
