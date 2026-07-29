import { cn } from '@/utils/cn'
import * as motion from 'framer-motion/client'

type TextHeadingProps = {
  children: React.ReactNode
  tag: 'h1' | 'h2' | 'h3' | 'h5'
  className?: string
  animateEntrance?: boolean
  yEntrance?: number
  delay?: number
}

export default function TextHeading({
  children,
  tag,
  className = '',
  animateEntrance = false,
  yEntrance = 175,
  delay = 0,
}: TextHeadingProps) {
  let styleClass = ''
  switch (tag) {
    case 'h1':
      styleClass = 'text-[76px] md:text-[116px] xl:text-[174px] font-semibold leading-[1.0] tracking-tighter'
      break
    case 'h2':
      styleClass = 'text-[40px] md:text-[56px] xl:text-[80px] font-bold leading-none tracking-tighter uppercase'
      break
    case 'h3':
    case 'h5':
      styleClass = 'text-[19px] md:text-[24px] xl:text-[30px] font-medium tracking-[-0.03em] uppercase'
      break
  }

  const Tag = tag

  if (animateEntrance) {
    return (
      /* 
        - px-6: Mở rộng vùng đệm 2 bên trái/phải lên 24px (chắc chắn đủ chứa nét viền chữ lớn nhất).
        - -mx-6: Bù trừ lại đúng 24px để layout tổng thể của trang KHÔNG BI BỊ LỆCH hay thay đổi vị trí.
      */
      <div className="overflow-hidden px-6 -mx-6">
        <motion.div
          initial={{ opacity: 0, y: yEntrance }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
          className={cn(styleClass, className)}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  return <Tag className={cn(styleClass, className)}>{children}</Tag>
}