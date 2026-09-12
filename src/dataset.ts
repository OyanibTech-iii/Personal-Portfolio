export interface ChatSuggestion {
  label: string
  response: string
}

export const chatSuggestions: ChatSuggestion[] = [
  {
    label: 'What can you offer?',
    response:
      "Here are the core services Pacifico offers:\n\n" +
      "- Full-Stack Web Development: Modern, high-performance web applications and Progressive Web Apps (PWAs) built with React, Next.js, TypeScript, Laravel, Symfony, Vanilla PHP, and MySQL.\n" +
      "- Mobile App Development: Cross-platform Android and iOS applications using React Native CLI with native efficiency.\n" +
      "- UI/UX & Graphic Design: Polished user interfaces, brand identities, logos, posters, and digital creative assets crafted in Figma, Affinity Suite, Adobe Photoshop, and Adobe Illustrator.\n" +
      "- Cisco Networking & Systems: Network topology design, subnetting, VLAN configuration, router and switch setups, and packet analysis.\n" +
      "- Python Automation & Tools: Custom computational tools, algorithms, data processing scripts, and automation utilities.\n" +
      "- Cybersecurity Foundations: ISC2-certified secure coding practices, access control concepts, and system hardening.",
  },
  {
    label: 'Pricing & Estimates',
    response:
      "Pricing & Baseline Estimates:\n\n" +
      "- Landing Pages & Portfolios:\n" +
      "  Initial baseline: Starting from ₱4,000 to ₱8,000\n" +
      "  Scope variation: Actual price varies depending on layout complexity, number of custom sections, custom animations, and responsive optimization.\n\n" +
      "- Full-Stack Web Applications & PWAs:\n" +
      "  Initial baseline: Starting from ₱15,000 to ₱35,000\n" +
      "  Scope variation: Actual price varies depending on database architecture, user authentication, third-party API integrations, admin dashboards, and custom backend business logic.\n\n" +
      "- Mobile Applications (React Native CLI):\n" +
      "  Initial baseline: Starting from ₱20,000 to ₱45,000\n" +
      "  Scope variation: Actual price varies depending on screen count, hardware access (camera, push notifications, storage), offline sync, and APK/app bundle delivery.\n\n" +
      "- Graphic Design & Brand Identity:\n" +
      "  Initial baseline: Starting from ₱1,500 to ₱5,000\n" +
      "  Scope variation: Actual price varies depending on visual complexity, logo concept revisions, promotional posters, and branding packages.\n\n" +
      "- Consulting, Maintenance & Custom Modules:\n" +
      "  Initial baseline: Starting from ₱500/hour or milestone-based contracts.\n\n" +
      "Important Note: These figures represent initial starting baselines. The final, actual price is always tailored to your project's specific features, technical scope, and timeline. Contact Pacifico for a precise, customized proposal.",
  },
  {
    label: 'What is your tech stack?',
    response:
      "Pacifico's technical stack spans modern frontend, backend, databases, and creative design tools:\n\n" +
      "- Frontend: React 19, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion\n" +
      "- Backend: Laravel, Symfony, Vanilla PHP, Node.js, Python, Java, RESTful APIs\n" +
      "- Databases: MySQL, PostgreSQL, SQLite\n" +
      "- Mobile: React Native CLI, Android SDK\n" +
      "- Design & Creative: Figma, Affinity Suite, Adobe Photoshop, Adobe Illustrator\n" +
      "- Networking & Systems: Cisco IOS, Packet Tracer, Linux, Docker, Virtualization",
  },
  {
    label: 'How can I hire you?',
    response:
      "Pacifico is available for freelance projects, contract roles, and full-time remote engineering positions.\n\n" +
      "How to get started:\n" +
      "1. Fill out the contact form located in the 'Let's Connect' section of this portfolio.\n" +
      "2. Email directly at: pacificooyanib@gmail.com\n" +
      "3. Connect on LinkedIn: linkedin.com/in/pacifico-oyanib\n" +
      "4. Check code repositories on GitHub: github.com/OyanibTech-iii\n\n" +
      "Share your project requirements, scope, or questions to receive a prompt proposal.",
  },
]

export const chatWelcomeMessage =
  "Hello! I am Pacifico's virtual assistant. I can answer questions about what services he offers, pricing estimates in ₱ (Philippine Peso), his tech stack, and how to collaborate."

export const chatFallbackResponse =
  "I appreciate your interest! This feature is currently under construction and in a building state. For inquiries, project proposals, or collaborations, feel free to explore the suggestion topics or reach out through the contact form in the 'Let's Connect' section of this portfolio."

/**
 * Intelligent bot responder with domain matching and strict privacy guardrails.
 * All responses are professional, completely emoji-free, with peso (₱) baseline pricing.
 */
export function getBotResponse(rawInput: string): string {
  const query = rawInput.toLowerCase().trim()

  if (!query) {
    return chatFallbackResponse
  }

  // ==========================================
  // 1. PRIVACY & SENSITIVE DETAILS GUARDRAIL
  // ==========================================
  const sensitivePatterns = [
    /\b(phone|cellphone|telephone|mobile\s*number|contact\s*number|call\s*you)\b/,
    /\b(address|home\s*address|where\s*do\s*you\s*live|exact\s*location|house|street|city|postal|zip)\b/,
    /\b(age|how\s*old|birth\s*day|birthday|birth\s*date|dob)\b/,
    /\b(personal\s*life|girlfriend|boyfriend|wife|husband|married|single|family|parents|mother|father)\b/,
    /\b(password|secret|bank|credit\s*card|account\s*number|salary|net\s*worth|income)\b/,
    /\b(id\s*number|ssn|tin|passport|government\s*id|personal\s*data)\b/,
  ]

  for (const pattern of sensitivePatterns) {
    if (pattern.test(query)) {
      return (
        "Privacy Notice:\n\n" +
        "For security and privacy reasons, personal details such as private phone numbers, residential addresses, exact birthdate, and personal credentials are kept confidential.\n\n" +
        "For all professional inquiries, project quotes, or collaborations, you can contact Pacifico through:\n" +
        "- The Contact Form on this site (scroll to 'Let's Connect')\n" +
        "- Email: pacificooyanib@gmail.com\n" +
        "- LinkedIn: linkedin.com/in/pacifico-oyanib\n" +
        "- GitHub: github.com/OyanibTech-iii\n\n" +
        "Pacifico is based in the Philippines and collaborates with clients remotely worldwide."
      )
    }
  }

  // ==========================================
  // 2. PRICING & COST ESTIMATES (₱)
  // ==========================================
  const pricingPatterns = [
    /\b(price|pricing|cost|how\s*much|rate|rates|budget|quote|fees?|charge|charges?|afford|expensive|cheap|estimate)\b/,
    /\b(peso|pesos|piso|php|package|packages|deal|payment)\b/,
  ]

  for (const pattern of pricingPatterns) {
    if (pattern.test(query)) {
      return (
        "Pricing & Baseline Estimates (₱):\n\n" +
        "- Landing Pages & Portfolio Websites:\n" +
        "  Initial baseline: Starting from ₱4,000 to ₱8,000\n" +
        "  Scope variation: Actual price varies depending on layout complexity, custom interactive animations, responsive optimization, and number of pages.\n\n" +
        "- Full-Stack Web Applications & PWAs:\n" +
        "  Initial baseline: Starting from ₱15,000 to ₱35,000\n" +
        "  Scope variation: Actual price varies depending on database architecture, user authentication, third-party API integrations, admin dashboards, and custom business logic.\n\n" +
        "- Mobile Applications (React Native CLI):\n" +
        "  Initial baseline: Starting from ₱20,000 to ₱45,000\n" +
        "  Scope variation: Actual price varies depending on screen count, hardware access (camera, push notifications, storage), offline sync, and APK delivery.\n\n" +
        "- Graphic Design & Brand Identity:\n" +
        "  Initial baseline: Starting from ₱1,500 to ₱5,000\n" +
        "  Scope variation: Actual price varies depending on logo concept revisions, digital posters, social media banners, and brand packages.\n\n" +
        "- Consulting, Maintenance & Custom Modules:\n" +
        "  Initial baseline: Starting from ₱500/hour or milestone-based contracts.\n\n" +
        "Important Note: These figures represent initial starting baselines. The actual final price depends on your project's specific scope and requirements. Reach out via the Contact form or email pacificooyanib@gmail.com for a tailored, obligation-free proposal."
      )
    }
  }

  // ==========================================
  // 3. SERVICES & WHAT PACIFICO OFFERS
  // ==========================================
  const servicePatterns = [
    /\b(offer|services?|what\s*(can|do)\s*you\s*(offer|do|build|make))\b/,
    /\b(can\s*you\s*(build|make|create|develop|help|design))\b/,
    /\b(specialty|capabilities|solutions?|expertise)\b/,
    /\b(web\s*development|mobile\s*app|graphic\s*design|networking)\b/,
  ]

  for (const pattern of servicePatterns) {
    if (pattern.test(query)) {
      return (
        "What Pacifico Can Build & Deliver:\n\n" +
        "1. Full-Stack Web Applications:\n" +
        "   High-performance websites and Progressive Web Apps (PWAs) using React, Next.js, TypeScript, Laravel, Symfony, Vanilla PHP, and MySQL.\n\n" +
        "2. Cross-Platform Mobile Apps:\n" +
        "   Fast and responsive Android and iOS apps with React Native CLI.\n\n" +
        "3. UI/UX & Graphic Design:\n" +
        "   Logos, branding packages, promotional posters, and UI mockups crafted in Figma, Affinity Suite, Adobe Photoshop, and Adobe Illustrator.\n\n" +
        "4. Cisco Core Networking:\n" +
        "   Subnetting, routing (OSPF, RIP), switching (VLANs, STP), packet analysis, and Cisco Packet Tracer configurations.\n\n" +
        "5. Automation & Python Tooling:\n" +
        "   Custom computational algorithms, CLI tools, and data workflow utilities.\n\n" +
        "6. Code Security & Hardening:\n" +
        "   Best-practice input validation, sanitization, secure authentication, and architecture hardening."
      )
    }
  }

  // ==========================================
  // 4. TECH STACK & PROGRAMMING LANGUAGES
  // ==========================================
  const techPatterns = [
    /\b(tech|stack|technologies|languages?|frameworks?|tools?|skills?|skillset)\b/,
    /\b(react|typescript|javascript|python|laravel|symfony|php|vanilla\s*php|mysql|affinity|photoshop|illustrator|figma|java|cisco|tailwind|node|docker|git)\b/,
  ]

  for (const pattern of techPatterns) {
    if (pattern.test(query)) {
      return (
        "Technical Stack & Proficiencies:\n\n" +
        "- Frontend: React 19, Next.js, TypeScript, JavaScript, Tailwind CSS v4, Framer Motion\n" +
        "- Backend: Laravel, Symfony, Vanilla PHP, Python (FastAPI/Flask), Node.js, Java\n" +
        "- Databases: MySQL, PostgreSQL, SQLite\n" +
        "- Mobile: React Native CLI, Android SDK\n" +
        "- UI/UX & Design: Figma, Affinity Suite, Adobe Photoshop, Adobe Illustrator\n" +
        "- Networking: Cisco IOS, Packet Tracer, Wireshark, Subnetting (IPv4/IPv6), VLANs\n" +
        "- Tools & DevOps: Git/GitHub, Docker, Linux, Vite, Vercel"
      )
    }
  }

  // ==========================================
  // 5. HIRING & AVAILABILITY
  // ==========================================
  const hiringPatterns = [
    /\b(hire|hiring|available|availability|collaborat(e|ion)|freelance|contract|work\s*with|job|remote)\b/,
    /\b(timeline|how\s*long|turnaround|deadline)\b/,
  ]

  for (const pattern of hiringPatterns) {
    if (pattern.test(query)) {
      return (
        "Availability & Hiring Process:\n\n" +
        "- Status: Currently open to freelance commissions, contract projects, and full-time remote engineering opportunities.\n" +
        "- Typical Timeline: Landing pages (3 to 7 days), Full-stack web apps (2 to 4 weeks), Mobile apps (3 to 6 weeks) depending on scope.\n" +
        "- Collaboration Steps:\n" +
        "  1. Scope & Requirements: Share your project goals and requirements.\n" +
        "  2. Proposal: Receive a clear quote, milestones, and deliverable timeline.\n" +
        "  3. Development & Updates: Regular progress previews and testing.\n" +
        "  4. Delivery & Support: Source code delivery, deployment, and post-launch verification.\n\n" +
        "Submit a brief in the Contact section to get started."
      )
    }
  }

  // ==========================================
  // 6. CERTIFICATIONS & EDUCATION
  // ==========================================
  const certPatterns = [
    /\b(certif(icate|ication|ied)?|credential|isc2|degree|education|college|university|norsu|school)\b/,
  ]

  for (const pattern of certPatterns) {
    if (pattern.test(query)) {
      return (
        "Education & Professional Certifications:\n\n" +
        "- Degree: Bachelor of Information Technology from Negros Oriental State University (NORSU)\n" +
        "- ISC2 Certified in Cybersecurity (CC):\n" +
        "  - Security Principles (Domain 1)\n" +
        "  - Business Continuity, Incident Response & DR (Domain 2)\n" +
        "  - Access Controls Concepts (Domain 3)\n" +
        "  - Network Security (Domain 4)\n" +
        "  - Security Operations (Domain 5)\n" +
        "- Specialized Training: DICT-ILCDB government technical training, KOICA digital transformation training, and Code Connect workshops.\n\n" +
        "Credentials can be viewed with official certificates in the 'About' section."
      )
    }
  }

  // ==========================================
  // 7. PROJECTS & PORTFOLIO WORK
  // ==========================================
  const projectPatterns = [
    /\b(projects?|portfolio|sample|work|github|apks?|apps?|tutorials?|youtube)\b/,
  ]

  for (const pattern of projectPatterns) {
    if (pattern.test(query)) {
      return (
        "Featured Projects on this Portfolio:\n\n" +
        "- Web PWAs: Weather apps, productivity tools, quote generators with offline support ('#web-apks')\n" +
        "- Mobile Apps: React Native task and utility apps with direct APK downloads ('#mobile-apps')\n" +
        "- Java Software: Movie booking systems and OOP desktop tools ('#java-desktop')\n" +
        "- Python Apps: Determinant matrix calculators and algorithmic solvers ('#python-apps')\n" +
        "- Graphics & Layouts: Brand identities, apparel designs, and editorial layouts ('#graphics' and '#layouts')\n" +
        "- YouTube Guides: Cisco network design and system administration tutorials ('#youtube-tutorials')\n\n" +
        "You can explore live demos and download links in each respective section above."
      )
    }
  }

  // ==========================================
  // 8. CONTACT INFO & REACHING OUT
  // ==========================================
  const contactPatterns = [
    /\b(contact|email|message|reach|talk|chat|connect|socials?|inbox|mail)\b/,
  ]

  for (const pattern of contactPatterns) {
    if (pattern.test(query)) {
      return (
        "How to Contact Pacifico:\n\n" +
        "- Email: pacificooyanib@gmail.com\n" +
        "- Contact Form: Scroll to the 'Let's Connect' section at the bottom of the page\n" +
        "- LinkedIn: linkedin.com/in/pacifico-oyanib\n" +
        "- GitHub: github.com/OyanibTech-iii\n" +
        "- Behance: behance.net/pacificooyanibcreate\n\n" +
        "Messages sent through the contact form are forwarded directly to his inbox."
      )
    }
  }

  // ==========================================
  // 9. GREETINGS & INTRODUCTIONS
  // ==========================================
  const greetingPatterns = [
    /\b(hi|hello|hey|good\s*(morning|afternoon|evening)|sup|howdy|yo|who\s*are\s*you)\b/,
  ]

  for (const pattern of greetingPatterns) {
    if (pattern.test(query)) {
      return (
        "Hello! I am Pacifico's virtual assistant.\n\n" +
        "Pacifico is a full-stack developer, mobile engineer, and cybersecurity enthusiast. I can help you with:\n" +
        "- Services and what he can build for you\n" +
        "- Pricing estimates and baseline rates in ₱\n" +
        "- Tech stack and programming tools\n" +
        "- How to hire or request a quote\n\n" +
        "What would you like to know today?"
      )
    }
  }

  // ==========================================
  // 10. APPRECIATION / CLOSING
  // ==========================================
  const closingPatterns = [
    /\b(thanks?|thank\s*you|awesome|cool|great|bye|goodbye|cya|see\s*you)\b/,
  ]

  for (const pattern of closingPatterns) {
    if (pattern.test(query)) {
      return "You are very welcome! If you have any project ideas or questions, please feel free to reach out via the Contact form or at pacificooyanib@gmail.com. Have a great day!"
    }
  }

  // Check suggestion labels as a fallback match
  for (const suggestion of chatSuggestions) {
    const cleanLabel = suggestion.label.toLowerCase().replace(/[^a-z0-9\s]/g, '')
    if (query.includes(cleanLabel) || cleanLabel.includes(query)) {
      return suggestion.response
    }
  }

  return chatFallbackResponse
}
