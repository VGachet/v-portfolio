import { CollectionConfig } from 'payload';

export const Songs: CollectionConfig = {
  slug: 'songs',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'url',
      label: 'Spotify URL',
      type: 'text',
    },
  ],
}
