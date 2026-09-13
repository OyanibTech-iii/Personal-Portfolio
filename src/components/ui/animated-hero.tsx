import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Dock, DockIcon } from "@/components/ui/dock";
import HeroImage from "@/components/HeroImage";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["GRAPHICS", "WEB DEV", "JAVA APPS", "PYTHON", "NETWORKING", "SYS ADMIN"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  };

  const centerImageVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const, delay: 0.2 },
    },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const, delay: 0.3 },
    },
  };

  const dockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.45 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={containerVariants}
      className="w-full relative overflow-hidden py-8 md:py-12 lg:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center min-h-[620px] lg:min-h-[720px] relative">
          
          {/* Left Column: Title & CTA Button */}
          <motion.div variants={leftColumnVariants} className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            <h1 className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white w-full">
              <span className="block text-neutral-400 dark:text-neutral-400 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-2">
                Building Solutions in
              </span>
              <span className="relative flex w-full justify-center lg:justify-start min-h-[1.25em] text-neutral-900 dark:text-white uppercase font-bold tracking-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl pr-6 overflow-visible">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold left-0 right-0 lg:left-0 text-center lg:text-left whitespace-nowrap pr-8"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start w-full">
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group inline-flex items-center gap-4 rounded-full bg-neutral-900 dark:bg-white pl-8 pr-2 py-2 font-clash font-normal text-lg text-white dark:text-neutral-900 transition-all duration-300 hover:bg-neutral-800 dark:hover:bg-neutral-100 hover:shadow-xl hover:shadow-neutral-900/15 dark:hover:shadow-white/15 active:scale-[0.97]"
              >
                Let&apos;s work together
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-neutral-900 transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg className="h-5 w-5 text-neutral-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </div>
          </motion.div>

          {/* Center Column: Hero Image with Robot Reveal */}
          <motion.div variants={centerImageVariants} className="lg:col-span-4 flex items-center justify-center relative z-10 py-4 lg:py-0">
            <div className="relative w-full max-w-[360px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[650px] xl:max-w-[720px] flex justify-center">
              <HeroImage
                className="w-full transform lg:scale-125 xl:scale-130 origin-center"
                revealSize={100}
              />
            </div>
          </motion.div>

          {/* Right Column: Description Paragraph */}
          <motion.div variants={rightColumnVariants} className="lg:col-span-3 flex flex-col justify-end items-center lg:items-start text-center lg:text-left z-20 lg:pt-48">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md lg:max-w-xs text-balance font-normal">
              Crafting intuitive UI/UX and polished frontends that turn ideas into delightful, high-performance experiences backed by dependable full-stack and networking expertise.
              <br className="hidden sm:inline" />
              <span className="mt-2 block">Let&apos;s build something elegant together.</span>
            </p>
          </motion.div>
        </div>

        {/* Bottom Tech Dock */}
        <motion.div variants={dockVariants} className="mt-10 sm:mt-14 flex w-full max-w-full flex-col items-center gap-6 px-2">
          <Dock className="max-w-full">
            <DockIcon name="PHP" href="#web-apks" src="https://cdn.simpleicons.org/php" />
            <DockIcon name="Laravel" href="#web-apks" src="https://cdn.simpleicons.org/laravel" />
            <DockIcon name="Symfony" href="#web-apks" src="https://cdn.simpleicons.org/symfony" darkSrc="https://cdn.simpleicons.org/symfony/f4f4f5" />
            <DockIcon name="Python" href="#python-apps" src="https://cdn.simpleicons.org/python" />
            <DockIcon name="Java" href="#java-desktop" src="https://svgl.app/library/java.svg" />
            <DockIcon name="Go" href="#python-apps" src="https://cdn.simpleicons.org/go" />
            <DockIcon name="C++" href="#python-apps" src="https://cdn.simpleicons.org/cplusplus" />
            <DockIcon name="Next.js" href="#web-apks" src="https://cdn.simpleicons.org/nextdotjs" darkSrc="https://cdn.simpleicons.org/nextdotjs/f4f4f5" />
            <DockIcon name="React Native" href="#web-apks" src="https://cdn.simpleicons.org/react" />
            <DockIcon name="MySQL" href="#web-apks" src="https://cdn.simpleicons.org/mysql" />
            <DockIcon name="Firebase" href="#web-apks" src="https://cdn.simpleicons.org/firebase" />
            <DockIcon name="Git" href="#home" src="https://cdn.simpleicons.org/git" />
            <DockIcon name="Docker" href="#networking" src="https://cdn.simpleicons.org/docker" />
            <DockIcon name="VMware" href="#networking" src="https://cdn.simpleicons.org/vmware" />
            <DockIcon name="Kali Linux" href="#networking" src="https://cdn.simpleicons.org/kalilinux" />
            <DockIcon name="Photoshop" href="#graphics" src="https://svgl.app/library/photoshop.svg" />
            <DockIcon name="Illustrator" href="#graphics" src="https://svgl.app/library/illustrator.svg" />
            <DockIcon name="Photopea" href="#graphics" src="https://cdn.simpleicons.org/photopea" />
          </Dock>
        </motion.div>
      </div>
    </motion.div>
  );
}

export { Hero };
