import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, Code2, Coffee, Terminal, Network, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Sys Admin", "Web Dev", "Java Apps", "Python", "Networking", "Graphics"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-shamrock-500">Building Solutions in</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 min-h-[1.2em]">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold left-0 right-0"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center my-6">
              Versatile software developer and network specialist dedicated to building robust applications and seamless digital solutions. Explore my projects spanning across multiple platforms and technologies.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6">
            <Dock>
              <DockIcon name="PHP" href="#web-apks" src="https://cdn.simpleicons.org/php" />
              <DockIcon name="Laravel" href="#web-apks" src="https://cdn.simpleicons.org/laravel" />
              <DockIcon name="Symfony" href="#web-apks" src="https://cdn.simpleicons.org/symfony" />
              <DockIcon name="Python" href="#python-apps" src="https://cdn.simpleicons.org/python" />
              <DockIcon name="Java" href="#java-desktop" src="https://svgl.app/library/java.svg" />
              <DockIcon name="Go" href="#python-apps" src="https://cdn.simpleicons.org/go" />
              <DockIcon name="C++" href="#python-apps" src="https://cdn.simpleicons.org/cplusplus" />
              <DockIcon name="Next.js" href="#web-apks" src="https://cdn.simpleicons.org/nextdotjs" />
              <DockIcon name="React Native" href="#web-apks" src="https://cdn.simpleicons.org/react" />
              <DockIcon name="MySQL" href="#web-apks" src="https://cdn.simpleicons.org/mysql" />
              <DockIcon name="Firebase" href="#web-apks" src="https://cdn.simpleicons.org/firebase" />
              <DockIcon name="Git" href="#home" src="https://cdn.simpleicons.org/git" />
              <DockIcon name="Docker" href="#networking" src="https://cdn.simpleicons.org/docker" />
              <DockIcon name="VMware" href="#networking" src="https://cdn.simpleicons.org/vmware" />
              <DockIcon name="Kali Linux" href="#networking" src="https://cdn.simpleicons.org/kalilinux" />
              <DockIcon name="Photoshop" href="#graphics" src="https://svgl.app/library/photoshop.svg" />
              <DockIcon name="Illustrator" href="#graphics" src="https://svgl.app/library/illustrator.svg" />
            </Dock>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
