import { CollectionConfig } from 'payload';
import {link} from "@/fields/link";

export const Stacks: CollectionConfig = {
  slug: 'stacks',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'upload',
      name: 'media',
      relationTo: 'media',
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
      name: 'isSquareImage',
      label: 'Square Image',
      type: 'checkbox',
      defaultValue: true,
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
