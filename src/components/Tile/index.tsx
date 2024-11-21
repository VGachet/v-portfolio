'use client'

import { cn } from '@/utilities/cn'
import React from 'react'

import type { Experience, Project, Stack, Tool } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { formatDateTime } from '@/utilities/formatDateTime'

export const Tile: React.FC<{
  className?: String
  doc?: Experience | Project | Stack | Tool
  relationTo?: String
}> = (props) => {
  const { className, doc, relationTo: titleFromProps } = props
  const { media, title, content, link, enabledLink, isSquareImage } = doc || {}

  const from = doc && doc['from'] ? doc['from'] : undefined
  const to = doc && doc['to'] ? doc['to'] : undefined

  const newTabProps = link?.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const imageClassName = isSquareImage ? 'rounded-lg aspect-square' : 'rounded-lg'

  return (
    <a className={cn('flex items-center py-2 hover:bg-card rounded-lg transition-colors', className)} href={
      link && link.url
        ? link.url
        : link && link.reference != null && typeof link.reference === 'object' && link.reference.value && link.reference.value['slug']
        ? `/${link.reference.value['slug']}`
        : '#'
    } {...newTabProps}>
      <div className="max-w-[60px]">
        {!media && <div className="">No image</div>}
        {Array.isArray(media) && media.length > 0 && <Media imgClassName={imageClassName} resource={media[0]} size={'60px'} />}
        {media && !Array.isArray(media) && <Media imgClassName={imageClassName} resource={media} size={'60px'} />}
      </div>
      <div className="pl-3 text-sm">
        {title && <h5>{title}</h5>}
        {content && <RichText content={content} />}
        {from && <time dateTime={from}>{formatDateTime(from)}{to && ` - ${formatDateTime(to)}`}{!to && ' - Today'}</time>}
      </div>
    </a>
  )
}
