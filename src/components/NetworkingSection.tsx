import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import multilayerSwitch from '../assets/multilayer-switch.webp'
import routerImg from '../assets/router.webp'

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

const devices = [
    {
      id: 'switch',
      title: 'Multilayer Switch',
      desc: 'Layer 2/3 switch for VLANs, switching, and routing.',
      sample: multilayerSwitch,
      config: [
        'Switch(config)# vlan 10',
        'Switch(config-vlan)# name USERS',
        'Switch(config)# interface g0/1',
        'Switch(config-if)# switchport mode access',
        'Switch(config-if)# switchport access vlan 10',
        'Switch(config)# interface vlan 10',
        'Switch(config-if)# ip address 192.168.10.1 255.255.255.0',
        'Switch(config-if)# no shutdown',
      ],
    },
    {
      id: 'router',
      title: 'Network Router',
      desc: 'Directs traffic between networks using intelligent protocols.',
      sample: routerImg,
      config: [
        'Router(config)# interface g0/0',
        'Router(config-if)# ip address 192.168.10.254 255.255.255.0',
        'Router(config-if)# no shutdown',
        'Router(config)# interface g0/1',
        'Router(config-if)# ip address 203.0.113.1 255.255.255.0',
        'Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.254',
        'Router(config)# ip dhcp pool LAN',
        'Router(dhcp-config)# network 192.168.10.0 255.255.255.0',
      ],
    }
  ]

export default function NetworkingSection() {
  const [openDevice, setOpenDevice] = useState<string | null>(null)
  const [openFundamental, setOpenFundamental] = useState<string | null>(null)

  const fundamentals = [
    { title: 'OSI Model', desc: '7 layers of network communication from Physical to Application.', details: ['Physical', 'Data Link', 'Network', 'Transport', 'Session', 'Presentation', 'Application'] },
    { title: 'TCP/IP Model', desc: 'The backbone of the modern internet architecture.', details: ['Link', 'Internet', 'Transport', 'Application'] },
    { title: 'TCP vs UDP', desc: 'Reliable connection-based vs fast connectionless transport.', details: ['TCP: connection-oriented, ordered, retransmission', 'UDP: connectionless, low overhead, real-time'] },
    { title: 'LAN vs WAN', desc: 'Local area networks versus wide area connectivity.', details: ['LAN: campus/office scope, high speed', 'WAN: connects sites across a wide area'] },
    { title: 'Architecture', desc: 'Client-Server and Peer-to-Peer distribution models.', details: ['Client-Server: centralized, scalable', 'Peer-to-Peer: decentralized, no central server'] },
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
          viewport={{ once: false, amount: 0.2 }}
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
              viewport={{ once: false, amount: 0.15 }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                Network Fundamentals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fundamentals.map((item) => {
                  const isOpen = openFundamental === item.title
                  return (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      className={`group rounded-2xl border transition-colors duration-300 overflow-hidden ${
                        isOpen
                          ? 'border-shamrock-500/40 dark:border-shamrock-500/40'
                          : 'border-neutral-200/60 dark:border-neutral-800/60'
                      } bg-white/50 dark:bg-neutral-900/40 backdrop-blur-md`}
                    >
                      <button
                        onClick={() => setOpenFundamental(isOpen ? null : item.title)}
                        className="w-full flex items-center justify-between gap-3 p-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <div className="relative">
                          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h4>
                          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-300 text-neutral-500 dark:text-neutral-400 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <ul className="px-5 pb-5 space-y-2">
                              {item.details.map((detail, d) => (
                                <li
                                  key={d}
                                  className="flex items-start gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-shamrock-500" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* IP Addressing */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
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
              viewport={{ once: false, amount: 0.15 }}
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
              viewport={{ once: false, amount: 0.15 }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                Hardware
              </h3>
              <div className="space-y-4">
                {devices.map((device) => {
                  const isOpen = openDevice === device.id
                  return (
                    <div
                      key={device.id}
                      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                        isOpen
                          ? 'border-shamrock-500/40 dark:border-shamrock-500/40'
                          : 'border-neutral-200/70 dark:border-neutral-800/70'
                      } bg-white/60 dark:bg-neutral-900/50 shadow-sm`}
                    >
                      <button
                        onClick={() => setOpenDevice(isOpen ? null : device.id)}
                        className="w-full flex items-center justify-between gap-3 p-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{device.title}</h4>
                          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{device.desc}</p>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-300 text-neutral-500 dark:text-neutral-400 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-3">
                              <div className="rounded-lg border border-neutral-200/70 bg-white/60 p-2 dark:border-neutral-800 dark:bg-neutral-900/40">
                                <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-widest text-shamrock-500 dark:text-shamrock-400">
                                  Sample Configuration
                                </p>
                                <img
                                  src={device.sample}
                                  alt={`${device.title} sample configuration`}
                                  className="w-full rounded-md object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <div className="rounded-lg border border-neutral-200/70 bg-white p-3 text-[11px] leading-relaxed dark:border-neutral-800 dark:bg-neutral-900 overflow-x-auto">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-shamrock-500 dark:text-shamrock-400">
                                  Configuration
                                </p>
                                {device.config.map((line, i) => (
                                  <code key={i} className="block font-mono text-neutral-700 whitespace-nowrap dark:text-neutral-300">
                                    {line}
                                  </code>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
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