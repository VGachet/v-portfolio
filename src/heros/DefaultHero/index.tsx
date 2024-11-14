import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type DefaultHeroType = {
  media?: Page['hero']['media']
  richText?: Page['hero']['richText']
}

export const DefaultHero: React.FC<DefaultHeroType> = ({ media, richText }) => {
  return (
    <div>
      <div className="container my-6">
          {richText && <RichText content={richText} />}
      </div>
      {media && typeof media === 'object' && (
        <div>
          <Media
            className="-mx-4 md:-mx-8 2xl:-mx-16"
            imgClassName=""
            priority
            resource={media}
          />
          {media?.caption && (
            <div className="mt-3">
              <RichText content={media.caption} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
