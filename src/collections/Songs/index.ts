import { CollectionConfig } from 'payload';
import { slugField } from '@/fields/slug'

export const Songs: CollectionConfig = {
  slug: 'songs',
  fields: [
    {
      type: 'richText',
      name: 'content',
    },
  ],
}
