import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  return (
    <div className='container md:px-0'>
      {columns &&
        columns.length > 0 &&
        <div className={`grid md:grid-cols-${columns?.length}`}>
          {columns.map((col, index) => {
              const { enableLink, linkLabel, linkUrl, richText } = col

              return (
                <div key={index} className={'md:px-8'}>
                  {richText && <RichText content={richText} className='my-6' />}
                  {enableLink && <CMSLink label={linkLabel} reference={linkUrl} type='reference' />}
                </div>
              )
            })}
        </div>
      }
    </div>
  )
}
