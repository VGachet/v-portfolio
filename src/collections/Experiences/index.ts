import { CollectionConfig } from 'payload'
import {link} from "@/fields/link";
import { slugField } from '@/fields/slug'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'upload',
      name: 'media',
      relationTo: 'media',
      required: true,
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
      type: 'date',
      name: 'from',
      label: 'From',
      required: true,
    },
    {
      type: 'date',
      name: 'to',
      label: 'To',
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
