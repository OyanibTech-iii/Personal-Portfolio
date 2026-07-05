export interface ChatSuggestion {
  label: string
  response: string
}

export const chatSuggestions: ChatSuggestion[] = [
  {
    label: 'Who are you?',
    response: "Hi! I'm Pacifico Oyanib III, a full-stack developer and cybersecurity enthusiast. I specialize in building secure, performant web and mobile applications with React, Next.js, Laravel, and Python.",
  },
  {
    label: 'What technologies do you use?',
    response: "I work with React, Next.js, TypeScript, Tailwind CSS, Laravel, Python, Docker, and React Native. I also have experience with cybersecurity auditing and cloud infrastructure.",
  },
  {
    label: 'How can I contact you?',
    response: "You can reach me through the contact form on this portfolio, or email me directly at pacificooyanib@gmail.com. I'm also available on GitHub and LinkedIn!",
  },
]

export const chatWelcomeMessage = "Hi there! I'm Pacifico's virtual assistant. Ask me anything about his skills, projects, or how to get in touch!"

export const chatFallbackResponse = "I appreciate your interest! This feature is coming soon. Feel free to reach out via the contact form or email me at pacificooyanib@gmail.com for now."
