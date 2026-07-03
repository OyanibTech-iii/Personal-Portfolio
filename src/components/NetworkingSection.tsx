import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import multilayerSwitch from '../assets/multilayer-switch.png'
import routerImg from '../assets/router.png'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

interface NetworkingSectionProps {
  onOpenDeviceModal: (device: { src: string; title: string; desc: string }) => void
}

export default function NetworkingSection({ onOpenDeviceModal }: NetworkingSectionProps) {
  const fundamentals = [
    { title: 'OSI Model', desc: '7 layers of network communication from Physical to Application.' },
    { title: 'TCP/IP Model', desc: 'The backbone of the modern internet architecture.' },
    { title: 'TCP vs UDP', desc: 'Reliable connection-based vs fast connectionless transport.' },
    { title: 'LAN vs WAN', desc: 'Local area networks versus wide area connectivity.' },
    { title: 'Architecture', desc: 'Client-Server and Peer-to-Peer distribution models.' },
  ]

  const devices = [
    { src: multilayerSwitch, title: 'Multilayer Switch', desc: 'Layer 2/3 switch for VLANs, switching, and routing.' },
    { src: routerImg, title: 'Network Router', desc: 'Directs traffic between networks using intelligent protocols.' }
  ]

  const ipAddressing = [
    { title: 'IPv4 & IPv6', desc: '32-bit and 128-bit addressing schemes for global identification.' },
    { title: 'Public vs Private', desc: 'Routable public IPs vs internal private address spaces.' },
    { title: 'CIDR & Subnetting', desc: 'Efficient network division using classless routing notation.' },
  ]

  const protocols = [
    { title: 'HTTP/HTTPS', desc: 'Web protocols with TLS/SSL encryption.' },
    { title: 'DNS', desc: 'Domain name resolution service.' },
    { title: 'DHCP', desc: 'Dynamic IP address allocation.' },
    { title: 'ARP', desc: 'IP to MAC address resolution.' },
    { title: 'ICMP', desc: 'Network diagnostics and connectivity testing.' },
    { title: 'FTP/SSH', desc: 'Secure file transfer and remote access.' }
  ]

  const tools = [
    { name: 'Cisco Packet Tracer', desc: 'Network simulation' },
    { name: 'Cisco CLI', desc: 'Router/Switch config' },
    { name: 'Wireshark', desc: 'Packet analysis' },
    { name: 'GNS3', desc: 'Advanced emulation' },
    { name: 'Kali Linux', desc: 'Security testing' },
    { name: 'Network Utilities', desc: 'Ping, Traceroute' }
  ]

  return (
    <section id="networking" className="mt-20 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Core Networking</h2>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Specializing in Cisco network design and implementation, covering everything from fundamental theory to advanced practical configurations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Knowledge Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Fundamentals */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                Network Fundamentals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fundamentals.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    className="group relative p-5 rounded-2xl border border-neutral-200/60 bg-white/50 dark:border-neutral-800/60 dark:bg-neutral-900/40 backdrop-blur-md overflow-hidden transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-shamrock-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h4>
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* IP Addressing */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                IP Addressing & Subnetting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ipAddressing.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-2xl border border-neutral-200/60 bg-white/50 dark:border-neutral-800/60 dark:bg-neutral-900/40 backdrop-blur-md"
                  >
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h4>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Protocols */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                Key Protocols
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {protocols.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex flex-wrap items-center gap-3 p-3 rounded-xl border border-neutral-200/50 bg-white/30 dark:border-neutral-800/50 dark:bg-neutral-900/20 hover:border-shamrock-200 dark:hover:border-shamrock-900/50 transition-colors"
                  >
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar: Devices & Tools */}
          <div className="space-y-12">
            {/* Devices */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                Hardware
              </h3>
              <div className="space-y-4">
                {devices.map((device, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/60 dark:border-neutral-800/70 dark:bg-neutral-900/50 shadow-sm"
                  >
                    <div className="h-32 w-full overflow-hidden">
                      <img 
                        src={device.src} 
                        alt={device.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{device.title}</h4>
                      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{device.desc}</p>
                      <button
                        onClick={() => onOpenDeviceModal(device)}
                        className="mt-3 flex items-center gap-1.5 text-xs font-bold text-shamrock-600 dark:text-shamrock-400 hover:text-shamrock-700 dark:hover:text-shamrock-300 transition-colors"
                      >
                        Technical Specs <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-neutral-200/70 bg-white/60 dark:border-neutral-800/70 dark:bg-neutral-900/50 backdrop-blur-md"
            >
              <h3 className="text-lg font-bold mb-6 text-neutral-900 dark:text-white">
                Toolbox
              </h3>
              <div className="space-y-4">
                {tools.map((tool, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div>
                      <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{tool.name}</p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}