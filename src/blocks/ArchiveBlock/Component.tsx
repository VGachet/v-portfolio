import type { Post, ArchiveBlock as ArchiveBlockProps, Experience, Stack, Project, Song, Tool } from '@/payload-types'

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
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
    showAllLink ,
    showAllLinkLabel,
    showAllLinkUrl
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

    const fetchedPosts = await payload.find({
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

    archiveList = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      archiveList = filteredSelectedPosts
    }
  }

  console.log(showAllLinkUrl !== undefined && showAllLinkUrl !== null && showAllLinkUrl.value['slug'])
  console.log(showAllLinkLabel)

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive archiveList={archiveList} relationTo={relationTo} />
      {showAllLink && (
        <div className="container">
          <CMSLink label={showAllLinkLabel} url={showAllLinkUrl !== undefined && showAllLinkUrl !== null && showAllLinkUrl.value['slug']}/>
        </div>
      )}
    </div>
  )
}
