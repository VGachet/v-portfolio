import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Experience, Post, Project, Song, Stack, Tool } from '@/payload-types'

import { Card } from '@/components/Card'
import { Tile } from '@/components/Tile'
import { res } from 'pino-std-serializers'

export type Props = {
  archiveList: Post[] | Experience[] | Project[] | Song[] | Stack[] | Tool[]
  relationTo: String
  columns?: number | null | undefined
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { archiveList, relationTo, columns } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className={`grid md:grid-cols-${columns}`}>
          {archiveList?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  {relationTo === 'post' && <Card className="h-full" doc={result} relationTo="posts" showCategories />}
                  {relationTo !== 'post' && <Tile relationTo={relationTo} doc={result} />}
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
