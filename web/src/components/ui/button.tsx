import Link from 'next/link'
import { cn } from '@/utils/cn'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  children,
  href,
  onClick,
  disabled,
  className = '',
  type = 'button',
  variant = 'primary',
  size = 'md',
}: ButtonProps) {
  const baseStyle =
    'cursor-pointer inline-block font-medium rounded-none transition-all duration-300 select-none text-center disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-[#F5F5F5] text-black hover:bg-black hover:text-white',
    outline: 'border border-zinc-800 text-white hover:bg-zinc-900 bg-transparent',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700',
  }

  const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-[26px] py-[16px]',
    lg: 'text-lg px-8 py-4',
  }

  const combinedClassName = cn(baseStyle, variantStyles[variant], sizeStyles[size], className)

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  )
}
