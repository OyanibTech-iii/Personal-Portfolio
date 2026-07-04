import * as React from "react"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DockProps {
  className?: string
  children: React.ReactNode
  maxAdditionalSize?: number
  iconSize?: number
}

interface DockIconProps {
  className?: string
  src?: string
  darkSrc?: string
  href: string
  name: string
  handleIconHover?: (e: React.MouseEvent<HTMLLIElement>) => void
  children?: React.ReactNode
  iconSize?: number
}

type ScaleValueParams = [number, number]

export const scaleValue = function (
  value: number,
  from: ScaleValueParams,
  to: ScaleValueParams
): number {
  const scale = (to[1] - to[0]) / (from[1] - from[0])
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0]
  return Math.floor(capped * scale + to[0])
}

export function DockIcon({
  className,
  src,
  darkSrc,
  href,
  name,
  handleIconHover,
  children,
  iconSize,
}: DockIconProps) {
  const ref = useRef<HTMLLIElement | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const imageSrc = isDark && darkSrc ? darkSrc : src

  return (
    <>
      <style>
        {`
          .dock-icon:hover + .dock-icon {
            width: calc(
              var(--icon-size) * 1.33 + var(--dock-offset-right, 0px)
            ) !important;
            height: calc(
              var(--icon-size) * 1.33 + var(--dock-offset-right, 0px)
            ) !important;
            margin-top: calc(
              var(--icon-size) * -0.33 + var(--dock-offset-right, 0) * -1
            ) !important;
          }

          .dock-icon:hover + .dock-icon + .dock-icon {
            width: calc(
              var(--icon-size) * 1.17 + var(--dock-offset-right, 0px)
            ) !important;
            height: calc(
              var(--icon-size) * 1.17 + var(--dock-offset-right, 0px)
            ) !important;
            margin-top: calc(
              var(--icon-size) * -0.17 + var(--dock-offset-right, 0) * -1
            ) !important;
          }

          .dock-icon:has(+ .dock-icon:hover) {
            width: calc(var(--icon-size) * 1.33 + var(--dock-offset-left, 0px)) !important;
            height: calc(
              var(--icon-size) * 1.33 + var(--dock-offset-left, 0px)
            ) !important;
            margin-top: calc(
              var(--icon-size) * -0.33 + var(--dock-offset-left, 0) * -1
            ) !important;
          }

          .dock-icon:has(+ .dock-icon + .dock-icon:hover) {
            width: calc(var(--icon-size) * 1.17 + var(--dock-offset-left, 0px)) !important;
            height: calc(
              var(--icon-size) * 1.17 + var(--dock-offset-left, 0px)
            ) !important;
            margin-top: calc(
              var(--icon-size) * -0.17 + var(--dock-offset-left, 0) * -1
            ) !important;
          }
        `}
      </style>
      <li
        ref={ref}
        style={
          {
            transition:
              "width, height, margin-top, cubic-bezier(0.25, 1, 0.5, 1) 150ms",
            "--icon-size": `${iconSize}px`,
          } as React.CSSProperties
        }
        onMouseMove={handleIconHover}
        className={cn(
          "dock-icon group/li flex h-[var(--icon-size)] w-[var(--icon-size)] cursor-pointer items-center justify-center px-[calc(var(--icon-size)*0.075)] hover:-mt-[calc(var(--icon-size)/2)] hover:h-[calc(var(--icon-size)*1.5)] hover:w-[calc(var(--icon-size)*1.5)] [&_img]:object-contain",
          className
        )}
      >
        <a
          href={href}
          className="group/a relative flex aspect-square w-full items-center justify-center rounded-[10px] border border-gray-100 bg-gradient-to-t from-neutral-100 to-white p-1.5 shadow-[rgba(0,_0,_0,_0.05)_0px_1px_0px_inset] after:absolute after:inset-0 after:rounded-[inherit] after:shadow-md after:shadow-zinc-800/10 dark:border-zinc-900 dark:from-zinc-900 dark:to-zinc-800 dark:shadow-[rgba(255,_255,_255,_0.3)_0px_1px_0px_inset]"
        >
          <span className="absolute top-[-40px] left-1/2 -translate-x-1/2 rounded-md border border-gray-100 bg-gradient-to-t from-neutral-100 to-white p-1 px-2 text-xs whitespace-nowrap text-black opacity-0 transition-opacity duration-200 group-hover/li:opacity-100 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800 dark:text-white">
            {name}
          </span>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className="h-full w-full rounded-[inherit]"
            />
          ) : (
            children
          )}
        </a>
      </li>
    </>
  )
}

export function Dock({
  className,
  children,
  maxAdditionalSize = 5,
  iconSize = 55,
}: DockProps) {
  const dockRef = useRef<HTMLDivElement | null>(null)

  const handleIconHover = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!dockRef.current) return
    const mousePos = e.clientX
    const iconPosLeft = e.currentTarget.getBoundingClientRect().left
    const iconWidth = e.currentTarget.getBoundingClientRect().width

    const cursorDistance = (mousePos - iconPosLeft) / iconWidth
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    )

    dockRef.current.style.setProperty(
      "--dock-offset-left",
      `${offsetPixels * -1}px`
    )

    dockRef.current.style.setProperty(
      "--dock-offset-right",
      `${offsetPixels}px`
    )
  }

  return (
    <nav ref={dockRef} role="navigation" aria-label="Main Dock">
      <ul
        className={cn(
          "flex flex-wrap items-center justify-center gap-2 rounded-xl border border-gray-100 bg-gradient-to-t from-neutral-50 to-white p-2 dark:border-zinc-900 dark:from-zinc-950 dark:to-zinc-900 md:flex-nowrap md:gap-0 md:p-1",
          className
        )}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement<DockIconProps>(child)
            ? React.cloneElement(child as React.ReactElement<DockIconProps>, {
                handleIconHover,
                iconSize,
              })
            : child
        )}
      </ul>
    </nav>
  )
}
