import { CollectionConfig } from 'payload';
import {link} from "@/fields/link";
import { slugField } from '@/fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'upload',
      name: 'media',
      relationTo: 'media',
      hasMany: true,
      label: 'Logo',
    },
    {
      type: 'text',
      name: 'title',
      required: true,
      label: 'Title',
    },
    {
      type: 'richText',
      name: 'content',
      label: 'Content',
    },
    {
      name: 'enabledLink',
      label: 'Enabled Link',
      type: 'checkbox',
      defaultValue: false,
    },
    link({
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData.enabledLink,
        },
      },
    }),
  ],
}
