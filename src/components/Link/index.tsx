import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import { ArrowUpRightIcon } from 'lucide-react'

type CMSLinkType = {
  children?: React.ReactNode
  className?: string
  variant?: ButtonProps['variant'] | null
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  displayIcon?: boolean | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    children,
    className,
    variant,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    displayIcon,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
        reference.value.slug
      }`
      : url

  if (!href) return null

  const size = sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  return (
    <Button asChild className={className} size={size} variant={variant}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
        {displayIcon && <ArrowUpRightIcon size={18} color='grey'/>}
      </Link>
    </Button>
  )
}
