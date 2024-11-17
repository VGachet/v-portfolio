import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'

type DefaultHeroType = {
  page?: Page
}

export const DefaultHero: React.FC<DefaultHeroType> = ({ page }) => {
  return (
    <div>
      <div className="container my-6">
          {page?.hero?.richText && <RichText content={page.hero.richText} />}
      </div>
      {page?.hero?.media && typeof page?.hero?.media === 'object' && (
        <div>
          <Media
            className="-mx-4 md:-mx-8 2xl:-mx-16"
            imgClassName=""
            priority
            resource={page?.hero?.media}
          />
          {page?.hero?.media?.caption && (
            <div className="mt-3">
              <RichText content={page?.hero?.media.caption} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
