import React, { forwardRef } from 'react'

export type CtaButtonVariant = 'arrow' | 'visit' | 'open' | 'download' | 'watch' | 'facebook'
export type CtaButtonSize = 'sm' | 'md' | 'lg'
export type CtaButtonTheme = 'dark' | 'brand' | 'outline' | 'subtle'

export interface CtaButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: CtaButtonVariant
  size?: CtaButtonSize
  theme?: CtaButtonTheme
  fullWidth?: boolean
  href?: string
  target?: string
  rel?: string
  as?: 'button' | 'a' | 'div' | 'span'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  download?: boolean | string
  icon?: React.ReactNode
  iconPosition?: 'right' | 'left'
  className?: string
  badgeClassName?: string
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
}

const sizeConfig: Record<
  CtaButtonSize,
  {
    btn: string
    badge: string
    icon: string
  }
> = {
  sm: {
    btn: 'text-xs py-1.5 pl-3.5 pr-1.5 gap-2.5',
    badge: 'h-6 w-6',
    icon: 'h-3.5 w-3.5',
  },
  md: {
    btn: 'text-sm py-2 pl-5 pr-2 gap-3',
    badge: 'h-8 w-8',
    icon: 'h-4 w-4',
  },
  lg: {
    btn: 'text-base sm:text-lg py-2 pl-7 sm:pl-8 pr-2 gap-4',
    badge: 'h-10 w-10 sm:h-11 sm:w-11',
    icon: 'h-5 w-5',
  },
}

const themeConfig: Record<
  CtaButtonTheme,
  {
    btn: string
    badge: string
  }
> = {
  dark: {
    btn: 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 hover:shadow-lg hover:shadow-neutral-900/15 dark:hover:shadow-white/15',
    badge: 'bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white',
  },
  brand: {
    btn: 'bg-shamrock-600 text-white dark:bg-shamrock-500 hover:bg-shamrock-700 dark:hover:bg-shamrock-600 hover:shadow-lg hover:shadow-shamrock-600/20',
    badge: 'bg-white text-shamrock-700 dark:bg-neutral-950 dark:text-shamrock-400',
  },
  outline: {
    btn: 'border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800',
    badge: 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900',
  },
  subtle: {
    btn: 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700',
    badge: 'bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white shadow-sm',
  },
}

export const CtaButton = forwardRef<HTMLElement, CtaButtonProps>(function CtaButton(
  {
    variant = 'arrow',
    size = 'md',
    theme = 'dark',
    fullWidth = false,
    href,
    target,
    rel,
    as,
    type = 'button',
    disabled = false,
    download,
    icon,
    iconPosition = 'right',
    className = '',
    badgeClassName = '',
    children,
    onClick,
    ...rest
  },
  ref
) {
  const currentSize = sizeConfig[size] || sizeConfig.md
  const currentTheme = themeConfig[theme] || themeConfig.dark

  const renderIcon = () => {
    if (icon) return icon

    switch (variant) {
      case 'download':
        return (
          <svg
            className={`${currentSize.icon} transition-transform duration-300 group-hover:translate-y-0.5`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        )

      case 'watch':
        return (
          <svg
            className={`${currentSize.icon} fill-current ml-0.5 transition-transform duration-300 group-hover:scale-110`}
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )

      case 'facebook':
        return (
          <svg
            className={`${currentSize.icon} transition-transform duration-300 group-hover:rotate-[-45deg]`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )

      case 'visit':
      case 'open':
      case 'arrow':
      default:
        return (
          <svg
            className={`${currentSize.icon} transition-transform duration-300 group-hover:rotate-[-45deg]`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )
    }
  }

  const badgeElement = (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${currentSize.badge} ${currentTheme.badge} ${badgeClassName}`}
    >
      {renderIcon()}
    </span>
  )

  const Tag = as || (href ? 'a' : 'button')

  const baseClasses = [
    'group inline-flex items-center rounded-full font-clash font-medium cursor-pointer select-none transition-all duration-300 active:scale-[0.98]',
    fullWidth ? 'w-full justify-between' : 'justify-center',
    currentSize.btn,
    currentTheme.btn,
    disabled ? 'opacity-50 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const commonProps = {
    ref: ref as React.Ref<any>,
    className: baseClasses,
    onClick,
    ...rest,
  }

  const content = (
    <>
      {iconPosition === 'left' && badgeElement}
      <span className={fullWidth ? 'text-left truncate' : 'truncate'}>{children}</span>
      {iconPosition === 'right' && badgeElement}
    </>
  )

  if (Tag === 'a') {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={download}
      >
        {content}
      </a>
    )
  }

  if (Tag === 'button') {
    return (
      <button {...commonProps} type={type} disabled={disabled}>
        {content}
      </button>
    )
  }

  return React.createElement(Tag, commonProps, content)
})

export default CtaButton
