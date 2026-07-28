type BoundedProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  /** Override horizontal padding. Default: responsive px-5 md:px-10 xl:px-20 */
  paddingX?: string
  /** Override or add vertical padding */
  paddingY?: string
}

/**
 * Bounded – responsive page-width container.
 * Wraps content with consistent horizontal padding across breakpoints.
 * Can be rendered as any HTML element via the `as` prop.
 *
 * @example
 * <Bounded as="section" paddingY="py-20">
 *   …content…
 * </Bounded>
 *
 * @example – full-bleed override
 * <Bounded paddingX="px-0">
 *   …full bleed content…
 * </Bounded>
 */
export default function Bounded({
  as: Tag = 'div',
  className = '',
  children,
  paddingX = 'px-5 md:px-10 xl:px-20',
  paddingY = '',
}: BoundedProps) {
  return (
    <Tag className={[paddingX, paddingY, className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
