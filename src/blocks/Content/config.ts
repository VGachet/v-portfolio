import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const columnFields: Field[] = [
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    defaultValue: false,
    label: 'Enable link',
  },
  {
    name: 'linkUrl',
    label: 'Link URL',
    type: 'relationship',
    relationTo: ['pages', 'posts'],
    required: true,
    maxDepth: 1,
    admin: {
      condition: (_, siblingData) => siblingData.enableLink,
      width: '50%',
    },
  },
  {
    name: 'linkLabel',
    label: 'Link label',
    type: 'text',
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData.enableLink,
      width: '50%',
    },
  }
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
  ],
}
