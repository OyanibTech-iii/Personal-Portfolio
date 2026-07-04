import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Flame } from 'lucide-react'
import { Button } from './ui/button'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const responses: Record<string, string> = {
  'who are you': "Hi! I'm Pacifico Oyanib III, a full-stack developer and cybersecurity enthusiast. I specialize in building secure, performant web and mobile applications with React, Next.js, Laravel, and Python.",
  'what technologies do you use': "I work with React, Next.js, TypeScript, Tailwind CSS, Laravel, Python, Docker, and React Native. I also have experience with cybersecurity auditing and cloud infrastructure.",
  'how can i contact you': "You can reach me through the contact form on this portfolio, or email me directly at pacificooyanib@gmail.com. I'm also available on GitHub and LinkedIn!",
}

const fallbackResponse = "I appreciate your interest! This feature is coming soon. Feel free to reach out via the contact form or email me at pacificooyanib@gmail.com for now."

export default function ChatFlame() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi there! I'm Pacifico's virtual assistant. Ask me anything about his skills, projects, or how to get in touch!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToFlametom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToFlametom()
  }, [messages, isTyping])

  const getResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase().trim()
    for (const [key, value] of Object.entries(responses)) {
      if (lower.includes(key)) return value
    }
    return fallbackResponse
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-shamrock-600 text-white shadow-lg shadow-shamrock-600/30 hover:bg-shamrock-700 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-neutral-200 bg-shamrock-600 px-4 py-3 dark:border-neutral-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Pacifico's Assistant</h3>
                <p className="text-xs text-white/70">Ask me anything</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full  ">
                      {/* <Flame className="h-4 w-4 text-shamrock-600 dark:text-shamrock-400" /> */}
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-shamrock-600 text-white rounded-br-md'
                        : 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="ml-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ">
                      {/* <User className="h-4 w-4 text-white" /> */}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:300ms]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  disabled={isTyping}
                  className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-shamrock-500 focus:ring-2 focus:ring-shamrock-500/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:focus:border-shamrock-400 disabled:opacity-50"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-shamrock-600 text-white hover:bg-shamrock-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
