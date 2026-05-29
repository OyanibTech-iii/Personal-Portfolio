import { CircularTestimonials } from "./ui/circular-testimonials"

const testimonials = [
  {
    quote:
      "I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond. I'll keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src:
      "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote:
      "Shining Yam is a hidden gem! The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src:
      "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl text-center">
          What People Say
        </h2>
        <div className="flex w-full max-w-6xl items-center justify-center rounded-3xl bg-neutral-50/50 p-8 dark:bg-neutral-900/30 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "var(--color-foreground)",
              designation: "var(--color-muted-foreground)",
              testimony: "var(--color-foreground)",
              arrowBackground: "var(--color-neutral-800)",
              arrowForeground: "white",
              arrowHoverBackground: "var(--color-shamrock-500)",
            }}
            fontSizes={{
              name: "1.75rem",
              designation: "1.125rem",
              quote: "1.125rem",
            }}
          />
        </div>
      </div>
    </section>
  )
}
