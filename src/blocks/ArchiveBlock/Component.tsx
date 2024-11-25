import type { ArchiveBlock as ArchiveBlockProps, Experience, Post, Project, Song, Stack, Tool } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CMSLink } from '@/components/Link'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    hasIntroContent,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
    showAllLink ,
    showAllLinkLabel,
    showAllLinkUrl,
    columns,
  } = props

  if (relationTo === undefined || relationTo === null) {
    throw new Error('relationTo is required')
  }

  const limit = limitFromProps || 3

  let archiveList: Post[] | Experience[] | Project[] | Song[] | Stack[] | Tool[] = []

  if (populateBy === 'collection') {
    const payload = await getPayloadHMR({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedCollection = await payload.find({
      collection: relationTo,
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    archiveList = fetchedCollection.docs
  } else {
    if (selectedDocs?.length) {
      archiveList = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]
    }
  }

  return (
    <div id={`block-${id}`}>
      {hasIntroContent && introContent && (
        <div className="container pt-20 pb-6">
          <RichText content={introContent} />
        </div>
      )}
      <CollectionArchive archiveList={archiveList} relationTo={relationTo} columns={columns}/>
      {showAllLink && showAllLinkUrl !== undefined && showAllLinkUrl !== null && (
        <div className="container pt-6">
          <CMSLink label={showAllLinkLabel} url={showAllLinkUrl.value['slug']} variant={'ghost'} displayIcon={true}/>
        </div>
      )}
    </div>
  )
}
