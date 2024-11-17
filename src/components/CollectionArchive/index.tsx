import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Experience, Post, Project, Song, Stack, Tool } from '@/payload-types'

import { Card } from '@/components/Card'
import { Tile } from '@/components/Tile'

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
                <div key={index} className={`animate-in slide-in-from-left duration-500 repeat-1`}>
                  {relationTo === 'post' && <Card doc={result} relationTo="posts" showCategories />}
                  {relationTo !== 'post' && relationTo !== 'songs' && <Tile relationTo={relationTo} doc={result} />}
                  {relationTo === 'songs' && <iframe title={result.title} src={result.url} className={'w-full max-h-[120px] outline-0'}/>}
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
