import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ImageWithSkeleton } from './ui/image-with-skeleton'
import { EmptyState } from './ui/empty-state'
import artboard1 from '../assets/branding/Artboard 1.webp'
import branding from '../assets/branding/branding.webp'
import coloredLogo from '../assets/logo/colored logo.webp'
import logoLayout from '../assets/logo/logo_layout.webp'
import laptopbagBalance from '../assets/logo/laptopbag logo balance.webp'
import laptopbagSketch from '../assets/logo/laptopbag sketch logo.webp'
import banner00 from '../assets/social media posts/banner 00.webp'
import frameBahalaNani from '../assets/social media posts/Frame Bahala nani.webp'
import poster from '../assets/posters/POSTER.webp'
import lambo from '../assets/posters/LAMBO.webp'
import liquidGameday from '../assets/posters/liquid gameday.webp'
import liquidResult from '../assets/posters/liquid result.webp'
import liquidLose from '../assets/posters/liquid lose.webp'
import harvest from '../assets/posters/harvest.webp'
import misProject from '../assets/posters/Oyanib_Pacifico_MISFinalProject.webp'
import paranoid from '../assets/posters/PARANOID.webp'
import pancit from '../assets/posters/pancit.webp'
import ramen from '../assets/posters/ramen.webp'
import ninoy from '../assets/posters/ninoy.webp'
import menShoes from '../assets/posters/men shoes.webp'
import hiring from '../assets/posters/hiring.webp'
import avocadoIcecream from '../assets/posters/avocado icecream.webp'
import strawberryIcecream from '../assets/posters/strawberry icecream.webp'
import vanillaIcecream from '../assets/posters/vanilla icecream.webp'
import lanyard from '../assets/social media posts/lanyard.webp'
import websiteUi1 from '../assets/website ui/services.webp'
import techwear from '../assets/website ui/techwear.webp'
import brandTypography1 from '../assets/branding/brand_typography1.webp'
import brandTypography2 from '../assets/branding/brand_typography2.webp'
import brandMockup from '../assets/branding/brand_mockup.webp'
import laptopBagBrand from '../assets/branding/laptop bag brand.webp'
import google from '../assets/social media posts/GOOGLE.webp'
import mlbb from '../assets/social media posts/MLBB.webp'
import selfMotivation from '../assets/social media posts/self motivation.webp'
import selfPoster from '../assets/social media posts/self poster.webp'
import fashion from '../assets/graphics2/fashion.webp'
import sinamakanPoster from '../assets/posters/sinamakan.webp'
import sinamakanMockup from '../assets/social media posts/makap.webp'
import bsitPlain from '../assets/t-shirt design/bsit plain.webp'
import bsitPlainWhole from '../assets/t-shirt design/bsit palin whole.webp'
import oversizeShirt from '../assets/t-shirt design/oversize.webp'
import campusShirt from '../assets/t-shirt design/campus.webp'
import bsitTribalShirt from '../assets/t-shirt design/bsint tribal concept.webp'
import kababaihanSweatshirt from '../assets/t-shirt design/kababaihan sweetshirt.webp'
import admaxPoloAll from '../assets/t-shirt design/ALL.webp'
import admaxPoloFront from '../assets/t-shirt design/FRONT.webp'
import admaxPoloBack from '../assets/t-shirt design/BACK.webp'
import orgPoloMockupFront from '../assets/t-shirt design/org polo/mockup.png'
import orgPoloMockupBack from '../assets/t-shirt design/org polo/mockup2.png'
import orgPoloTemplate from '../assets/t-shirt design/org polo/template org.png'
import orgPoloFrontFull from '../assets/t-shirt design/org polo/front design full.png'
import orgPoloBackFull from '../assets/t-shirt design/org polo/back design.png'
import orgPoloFrontClose from '../assets/t-shirt design/org polo/front org.png'
import orgPoloBackClose from '../assets/t-shirt design/org polo/back org.png'

interface GraphicsSectionProps {
  onOpenDeviceModal?: (d: { src: string; title: string; desc: string; images?: string[]; imageLabels?: string[] }) => void
}

export type GraphicsCategory = 'All' | 'Logo' | 'Social Media' | 'Website UI' | 'Posters' | 'Branding' | 'T-Shirt'

const categories: GraphicsCategory[] = ['All', 'Logo', 'Social Media', 'Website UI', 'Posters', 'Branding', 'T-Shirt']

interface GraphicItem {
  src: string
  title: string
  desc: string
  category: GraphicsCategory
  images?: string[]
  imageLabels?: string[]
  disclaimer?: string
}

const graphics: GraphicItem[] = [
  { src: harvest, title: 'Harvest Festival', desc: 'Event poster for a local harvest celebration.', category: 'Posters' as GraphicsCategory },
  { src: artboard1, title: 'Brand Logo', desc: 'Brand logo I designed for a vegan restaurant.', category: 'Branding' as GraphicsCategory },
  { src: coloredLogo, title: 'Colored Logo', desc: 'Full-color logo mark with its complete identity.', category: 'Logo' as GraphicsCategory },
  { src: logoLayout, title: 'Logo Layout', desc: 'Logo layout guide with variations and specifications.', category: 'Logo' as GraphicsCategory },
  { src: laptopbagSketch, title: 'Laptopbag Sketch Logo', desc: 'Concept sketch logo design for a laptop bag brand.', category: 'Logo' as GraphicsCategory },
  { src: laptopbagBalance, title: 'Laptopbag Logo', desc: 'Balanced logo design for a laptop bag brand.', category: 'Logo' as GraphicsCategory },
  { src: branding, title: 'Brand Identity', desc: 'Complete brand identity system and application.', category: 'Branding' as GraphicsCategory },
  { src: lanyard, title: 'Lanyard Design', desc: 'My own version design of our school lanyard.', category: 'Social Media' as GraphicsCategory },
  { src: misProject, title: 'MIS Final Project', desc: 'Comprehensive branding and UI design for a management system.', category: 'Posters' as GraphicsCategory },
  { src: frameBahalaNani, title: 'Organization Frame', desc: 'Frame I designed for a school organization.', category: 'Social Media' as GraphicsCategory },
  { src: banner00, title: 'Fresh Safe Banner', desc: 'Organic produce promotional banner design.', category: 'Social Media' as GraphicsCategory },
  { src: lambo, title: 'Lambo Poster', desc: 'Modern poster design featuring luxury automotive aesthetics.', category: 'Posters' as GraphicsCategory },
  { src: liquidGameday, title: 'Liquid Gameday', desc: 'Gameday event poster for Liquid — vibrant and high-energy design.', category: 'Posters' as GraphicsCategory, disclaimer: 'Concept Art / Fan Work Only' },
  { src: liquidResult, title: 'Liquid Result', desc: 'Post-match results graphic for Liquid with bold, competitive aesthetics.', category: 'Posters' as GraphicsCategory, disclaimer: 'Concept Art / Fan Work Only' },
  { src: liquidLose, title: 'Liquid Lose', desc: 'Post-match loss graphic for Liquid with a somber and dramatic visual tone.', category: 'Posters' as GraphicsCategory, disclaimer: 'Concept Art / Fan Work Only' },
  { src: poster, title: 'Favorite Cartoon Poster', desc: 'Bold and vibrant poster with striking typography.', category: 'Posters' as GraphicsCategory },
  { src: pancit, title: 'Pancit Poster', desc: 'Creative poster design showcasing Filipino Pancit Canton.', category: 'Posters' as GraphicsCategory },
  { src: ramen, title: 'Ramen Poster', desc: 'Japanese ramen illustration poster design.', category: 'Posters' as GraphicsCategory },
  { src: brandTypography1, title: 'Brand Typography 1', desc: 'Typography exploration for a brand identity.', category: 'Branding' as GraphicsCategory },
  { src: brandTypography2, title: 'Brand Typography 2', desc: 'Typography exploration for a brand identity.', category: 'Branding' as GraphicsCategory },
  { src: brandMockup, title: 'Brand Mockup', desc: 'Mockup showcasing the brand identity in context.', category: 'Branding' as GraphicsCategory },
  { src: laptopBagBrand, title: 'Laptop Bag Brand', desc: 'Complete brand application for the laptop bag line.', category: 'Branding' as GraphicsCategory },
  { src: websiteUi1, title: 'Website UI Design', desc: 'Modern website interface design.', category: 'Website UI' as GraphicsCategory },
  { src: techwear, title: 'Techwear Website UI', desc: 'E-commerce website interface for a techwear brand.', category: 'Website UI' as GraphicsCategory },
  { src: google, title: 'Google Gemini', desc: 'Social media post design featuring Google workshop.', category: 'Social Media' as GraphicsCategory },
  { src: mlbb, title: 'MLBB Tournament', desc: 'Social media post design featuring a Mobile Legends.', category: 'Social Media' as GraphicsCategory },
  { src: selfMotivation, title: 'Self Motivation', desc: 'Empowering social media post design focusing on self-motivation.', category: 'Social Media' as GraphicsCategory },
  { src: selfPoster, title: 'Self Poster', desc: 'Creative social media post design with bold typography and aesthetics.', category: 'Social Media' as GraphicsCategory },
  { src: sinamakanMockup, title: 'Sinamak Design Mockup', desc: 'Product mockup for Sinamak spiced vinegar social media presentation.', category: 'Social Media' as GraphicsCategory },
  { src: sinamakanPoster, title: 'Sinamak Poster', desc: 'Vibrant poster design showcasing Sinamak spiced vinegar branding.', category: 'Posters' as GraphicsCategory },
  { src: paranoid, title: 'PARANOID', desc: 'Bold poster design with striking paranoid theme and typography.', category: 'Posters' as GraphicsCategory },
  { src: fashion, title: 'Fashion Design', desc: 'Stylish fashion graphic design with a modern aesthetic.', category: 'Posters' as GraphicsCategory },
  { src: ninoy, title: 'Ninoy Aquino', desc: 'Poster design commemorating Ninoy Aquino.', category: 'Posters' as GraphicsCategory },
  { src: menShoes, title: 'Men Shoes', desc: 'Stylish men shoes poster design with modern aesthetics.', category: 'Posters' as GraphicsCategory },
  { src: hiring, title: "We're Hiring", desc: "Hiring flyer for a graphic designer position.", category: 'Posters' as GraphicsCategory },
  { src: avocadoIcecream, title: 'Avocado Ice Cream', desc: 'Vibrant avocado ice cream poster design with a fresh and tropical aesthetic.', category: 'Posters' as GraphicsCategory },
  { src: strawberryIcecream, title: 'Strawberry Ice Cream', desc: 'Sweet and luscious strawberry ice cream poster with a bold, colorful design.', category: 'Posters' as GraphicsCategory },
  { src: vanillaIcecream, title: 'Vanilla Ice Cream', desc: 'Classic and elegant vanilla ice cream poster with a clean, minimalist look.', category: 'Posters' as GraphicsCategory },
  { src: orgPoloMockupFront, images: [orgPoloMockupFront, orgPoloMockupBack, orgPoloTemplate, orgPoloFrontFull, orgPoloBackFull, orgPoloFrontClose, orgPoloBackClose], imageLabels: ['Front Mockup', 'Back Mockup', 'Design Template', 'Front View', 'Back View', 'Front Detail', 'Back Detail'], title: 'Organization Polo Shirt Design', desc: 'University organization polo shirt design featuring realistic front and back on-model mockups, 3D apparel renders, and template layouts.', category: 'T-Shirt' as GraphicsCategory },
  { src: admaxPoloAll, images: [admaxPoloAll, admaxPoloFront, admaxPoloBack], imageLabels: ['All Views', 'Front Design', 'Back Design'], title: 'ADMAX Polo Shirt Design', desc: 'Custom corporate polo shirt design for ADMAX featuring complete overview, front design, and back design perspectives.', category: 'T-Shirt' as GraphicsCategory },
  { src: bsitPlainWhole, images: [bsitPlainWhole, bsitPlain], imageLabels: ['Full Concept', 'Detail View'], title: 'BSIT T-Shirt Design Concept', desc: 'Concept BSIT shirt design showcasing full and detailed views from multiple angles.', category: 'T-Shirt' as GraphicsCategory },
  { src: campusShirt, title: 'Campus T-Shirt Design Concept', desc: 'Concept t-shirt graphic design for campus streetwear.', category: 'T-Shirt' as GraphicsCategory },
  { src: oversizeShirt, title: 'Oversize T-Shirt Design', desc: 'Modern streetwear oversized fit custom t-shirt graphic design.', category: 'T-Shirt' as GraphicsCategory },
  { src: bsitTribalShirt, title: 'BSIT Tribal Concept T-Shirt', desc: 'Tribal-inspired concept t-shirt graphic design for BSIT.', category: 'T-Shirt' as GraphicsCategory },
  { src: kababaihanSweatshirt, title: 'Kababaihan Sweatshirt Design', desc: 'Custom graphic sweatshirt design celebrating Kababaihan.', category: 'T-Shirt' as GraphicsCategory },
]

export default function GraphicsSection({ onOpenDeviceModal }: GraphicsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<GraphicsCategory>('All')

  const filtered = useMemo(
    () => (activeCategory === 'All' ? graphics : graphics.filter((item) => item.category === activeCategory)),
    [activeCategory]
  )

  return (
    <section id="graphics" className="mt-14 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">Graphics Portfolio</motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-balance">
            A collection of brand identities, posters, and merchandise designs crafted with precision and creativity.
          </motion.p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
                activeCategory === category
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm scale-105'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 gap-4 ${activeCategory === 'All' ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {filtered.length === 0 ? (
            <EmptyState
              title={`No ${activeCategory === 'All' ? '' : activeCategory} items yet`}
              description={`There are currently no designs in the ${activeCategory.toLowerCase()} category.`}
            />
          ) : (
            filtered.map((item, i) => {
              const isLarge = activeCategory === 'All' && (i === 0 || i === 3)
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onOpenDeviceModal?.({ src: item.src, title: item.title, desc: item.desc, images: item.images, imageLabels: item.imageLabels })}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-100 dark:bg-neutral-800 ${
                    activeCategory === 'All'
                      ? isLarge
                        ? 'md:col-span-2 md:row-span-2'
                        : 'md:col-span-1 md:row-span-1'
                      : 'md:col-span-1 md:row-span-1'
                  }`}
                >
                  <ImageWithSkeleton
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    containerClassName="h-full w-full"
                    loading="lazy"
                  />

                  {item.disclaimer && (
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-sm ring-1 ring-white/20 pointer-events-none">
                      {item.disclaimer}
                    </div>
                  )}

                  {item.images && item.images.length > 1 && (
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-shamrock-600/90 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-white shadow-lg backdrop-blur-sm ring-1 ring-white/30 pointer-events-none transition-transform duration-300 group-hover:scale-105">
                      <span>+{item.images.length - 1} More</span>
                      <span className="hidden sm:inline text-[10px] opacity-80 font-normal">| Click to view</span>
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end ${
                    activeCategory === 'All'
                      ? isLarge
                        ? 'p-4 sm:p-6'
                        : 'p-3 sm:p-4'
                      : 'p-3.5 sm:p-5'
                  }`}>
                    <motion.h3
                      className={`text-white font-bold transform translate-y-3 transition-transform duration-300 group-hover:translate-y-0 ${
                        activeCategory === 'All'
                          ? isLarge
                            ? 'text-base sm:text-lg'
                            : 'text-xs sm:text-sm line-clamp-1'
                          : 'text-sm sm:text-base line-clamp-1'
                      }`}>
                      {item.title}
                    </motion.h3>
                    <motion.p
                      className={`text-white/80 transform translate-y-3 transition-transform duration-300 group-hover:translate-y-0 delay-75 ${
                        activeCategory === 'All'
                          ? isLarge
                            ? 'text-xs sm:text-sm mt-1.5 line-clamp-3'
                            : 'text-[11px] sm:text-xs mt-0.5 line-clamp-2'
                          : 'text-xs mt-1 line-clamp-2'
                      }`}>
                      {item.desc}
                    </motion.p>
                    {item.images && item.images.length > 1 && (
                      <motion.span className={`inline-flex items-center gap-1 text-shamrock-300 font-semibold transform translate-y-3 transition-transform duration-300 group-hover:translate-y-0 delay-100 ${
                        activeCategory === 'All' && !isLarge ? 'text-[10px] mt-0.5' : 'text-xs mt-1'
                      }`}>
                        Click to view all {item.images.length} views
                      </motion.span>
                    )}
                    {item.disclaimer && (
                      <motion.p
                        className={`text-white/50 italic transform translate-y-3 transition-transform duration-300 group-hover:translate-y-0 delay-100 ${
                          activeCategory === 'All' && !isLarge ? 'text-[10px] mt-0.5' : 'text-xs mt-1'
                        }`}>
                        {item.disclaimer}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
