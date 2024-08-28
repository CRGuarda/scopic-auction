import { cn } from '@/lib/utils/utils'
import { HTMLAttributes } from 'react'

export const PageTitle = ({ children, className, ...rest }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1 className={cn('text-xl lg:text-3xl font-bold uppercase text-center', className)} {...rest}>
      {children}
    </h1>
  )
}
