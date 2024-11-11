import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Experience, Post, Project, Song, Stack, Tool } from '@/payload-types'

import { Card } from '@/components/Card'

export type Props = {
  archiveList: Post[] | Experience[] | Project[] | Song[] | Stack[] | Tool[]
  relationTo: String
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { archiveList } = props
  const { relationTo } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {archiveList?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  {relationTo === 'post' && <Card className="h-full" doc={result} relationTo="posts" showCategories />}
                  {(relationTo === 'experiences' || relationTo === 'projects') && <div>{result['title']}</div>}
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
