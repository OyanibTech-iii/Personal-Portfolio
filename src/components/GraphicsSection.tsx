import { motion } from 'framer-motion'
import { ImageWithSkeleton } from './ui/image-with-skeleton'
import artboard1 from '../assets/Artboard 1.png'
import lanyard from '../assets/lanyard.png'
import frameBahalaNani from '../assets/Frame Bahala nani.png'
import lambo from '../assets/lambo.png'
import liquid from '../assets/LIQUID.png'
import poster from '../assets/POSTER.png'
import v3 from '../assets/v3.png'
import banner00 from '../assets/graphics2/banner 00.png'
import harvest from '../assets/graphics2/harvest.png'
import misProject from '../assets/graphics2/Oyanib_Pacifico_MISFinalProject.png'
import practice from '../assets/practice.png'

interface GraphicsSectionProps {
  onOpenDeviceModal?: (d: { src: string; title: string; desc: string }) => void
}

export default function GraphicsSection({ onOpenDeviceModal }: GraphicsSectionProps) {
  const graphics = [
    { src: banner00, title: 'Fresh Safe Banner', desc: 'Organic produce promotional banner design.' },
    { src: artboard1, title: 'Brand Logo', desc: 'Brand logo I designed for a vegan restaurant.' },
    { src: lanyard, title: 'Lanyard Design', desc: 'My own version design of our school lanyard.' },
    { src: harvest, title: 'Harvest Festival', desc: 'Event poster for a local harvest celebration.' },
    { src: frameBahalaNani, title: 'Organization Frame', desc: 'Frame I designed for a school organization.' },
    { src: practice, title: 'Practice Design', desc: 'Practice graphic design piece.' },
    { src: misProject, title: 'MIS Final Project', desc: 'Comprehensive branding and UI design for a management system.' },
    { src: lambo, title: 'Lambo Poster', desc: 'Modern poster design featuring luxury automotive aesthetics.' },
    { src: liquid, title: 'Liquid Poster', desc: 'Abstract fluid art poster with dynamic visual effects.' },
    { src: poster, title: 'Favorite Cartoon Poster', desc: 'Bold and vibrant poster with striking typography.' },
    { src: v3, title: 'V3 Design', desc: 'Version 3 concept design with modern aesthetics.' }
  ]

  return (
    <section id="graphics" className="mt-14 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">Graphics Portfolio</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-balance">
            A collection of brand identities, posters, and merchandise designs crafted with precision and creativity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[900px]">
          {graphics.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onOpenDeviceModal?.({ src: item.src, title: item.title, desc: item.desc })}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-100 dark:bg-neutral-800 ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : 
                i === 3 ? 'md:col-span-2 md:row-span-2' : 
                'md:col-span-1 md:row-span-1'
              }`}
            >
              <ImageWithSkeleton
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                containerClassName="h-full w-full"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
                <motion.h3 
                  className="text-white font-bold text-lg transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                  {item.title}
                </motion.h3>
                <motion.p 
                  className="text-white/80 text-sm mt-2 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0 delay-75">
                  {item.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}